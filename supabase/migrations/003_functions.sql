-- ============================================================
-- MIGRACIÓN 003: FUNCIONES Y RPC
-- ============================================================

-- FUNCIÓN: GENERAR NÚMERO DE PEDIDO
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  seq INT;
  order_num TEXT;
BEGIN
  year := TO_CHAR(NOW(), 'YYYY');
  SELECT COALESCE(MAX(SUBSTRING(order_number FROM '\d{6}')::INT), 0) + 1 INTO seq
  FROM orders WHERE order_number LIKE 'ORD-' || year || '-%';
  order_num := 'ORD-' || year || '-' || LPAD(seq::TEXT, 6, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- FUNCIÓN: CREAR PEDIDO TRANSACCIONAL
CREATE OR REPLACE FUNCTION create_order(
  p_address_id UUID,
  p_payment_method TEXT,
  p_customer_notes TEXT DEFAULT '',
  p_shipping_cost NUMERIC DEFAULT 0
)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_cart_id UUID;
  v_order_id UUID;
  v_order_number TEXT;
  v_item RECORD;
  v_product RECORD;
  v_subtotal NUMERIC := 0;
  v_total NUMERIC := 0;
  v_cart_empty BOOLEAN := true;
BEGIN
  -- Verificar autenticación
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Debes iniciar sesión para crear un pedido.';
  END IF;

  -- Obtener carrito
  SELECT id INTO v_cart_id FROM carts WHERE user_id = v_user_id;
  IF v_cart_id IS NULL THEN
    RAISE EXCEPTION 'El carrito está vacío.';
  END IF;

  -- Verificar que el carrito tenga items
  SELECT EXISTS (SELECT 1 FROM cart_items WHERE cart_id = v_cart_id) INTO v_cart_empty;
  IF NOT v_cart_empty THEN
    RAISE EXCEPTION 'El carrito está vacío.';
  END IF;

  -- Generar número de pedido
  v_order_number := generate_order_number();

  -- Crear el pedido
  INSERT INTO orders (
    order_number, user_id, address_id, status,
    subtotal, shipping_cost, discount, total,
    payment_method, payment_status, customer_notes
  ) VALUES (
    v_order_number, v_user_id, p_address_id, 'pending',
    0, p_shipping_cost, 0, 0,
    p_payment_method, 'pending', p_customer_notes
  )
  RETURNING id INTO v_order_id;

  -- Procesar cada item del carrito
  FOR v_item IN
    SELECT ci.product_id, ci.quantity, ci.unit_price,
           p.name, p.sku, p.stock, p.is_active, p.offer_price, p.price
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = v_cart_id
  LOOP
    -- Validar producto activo
    IF NOT v_item.is_active THEN
      RAISE EXCEPTION 'El producto "%" no está disponible.', v_item.name;
    END IF;

    -- Validar stock
    IF v_item.stock < v_item.quantity THEN
      RAISE EXCEPTION 'Stock insuficiente para "%". Disponible: %', v_item.name, v_item.stock;
    END IF;

    -- Calcular precio (usar offer_price si existe, si no price)
    v_item.unit_price := COALESCE(v_item.offer_price, v_item.price);

    -- Insertar order_item
    INSERT INTO order_items (order_id, product_id, product_name, product_sku, quantity, unit_price, subtotal)
    VALUES (v_order_id, v_item.product_id, v_item.name, v_item.sku, v_item.quantity, v_item.unit_price, v_item.unit_price * v_item.quantity);

    -- Descontar stock
    UPDATE products SET stock = stock - v_item.quantity WHERE id = v_item.product_id;

    -- Acumular subtotal
    v_subtotal := v_subtotal + (v_item.unit_price * v_item.quantity);
  END LOOP;

  -- Calcular total
  v_total := v_subtotal + p_shipping_cost;

  -- Actualizar pedido con totales
  UPDATE orders SET
    subtotal = v_subtotal,
    total = v_total
  WHERE id = v_order_id;

  -- Registrar historial inicial
  INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by)
  VALUES (v_order_id, NULL, 'pending', v_user_id);

  -- Vaciar carrito
  DELETE FROM cart_items WHERE cart_id = v_cart_id;
  DELETE FROM carts WHERE id = v_cart_id;

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'total', v_total
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FUNCIÓN: CANCELAR PEDIDO
CREATE OR REPLACE FUNCTION cancel_order(p_order_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_user_id UUID;
  v_order RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Debes iniciar sesión.';
  END IF;

  SELECT * INTO v_order FROM orders WHERE id = p_order_id;
  IF v_order IS NULL THEN
    RAISE EXCEPTION 'Pedido no encontrado.';
  END IF;

  -- Verificar permisos
  IF v_order.user_id != v_user_id AND NOT is_admin() THEN
    RAISE EXCEPTION 'No tienes permiso para cancelar este pedido.';
  END IF;

  -- Verificar estado válido para cancelación
  IF v_order.status NOT IN ('pending', 'confirmed') THEN
    RAISE EXCEPTION 'Solo se pueden cancelar pedidos pendientes o confirmados.';
  END IF;

  -- Restaurar stock
  UPDATE products p
  SET stock = p.stock + oi.quantity
  FROM order_items oi
  WHERE oi.order_id = p_order_id AND oi.product_id = p.id;

  -- Actualizar estado
  UPDATE orders SET status = 'cancelled', updated_at = now() WHERE id = p_order_id;

  -- Registrar historial
  INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, notes)
  VALUES (p_order_id, v_order.status, 'cancelled', v_user_id, 'Cancelado por el usuario');

  RETURN jsonb_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FUNCIÓN: ACTUALIZAR ESTADO DE PEDIDO (admin)
CREATE OR REPLACE FUNCTION update_order_status(
  p_order_id UUID,
  p_new_status TEXT,
  p_notes TEXT DEFAULT ''
)
RETURNS JSONB AS $$
DECLARE
  v_old_status TEXT;
BEGIN
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Solo administradores pueden cambiar estados.';
  END IF;

  SELECT status INTO v_old_status FROM orders WHERE id = p_order_id;
  IF v_old_status IS NULL THEN
    RAISE EXCEPTION 'Pedido no encontrado.';
  END IF;

  UPDATE orders SET status = p_new_status, admin_notes = CASE WHEN p_notes != '' THEN p_notes ELSE admin_notes END, updated_at = now() WHERE id = p_order_id;

  INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, notes)
  VALUES (p_order_id, v_old_status, p_new_status, auth.uid(), p_notes);

  RETURN jsonb_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
