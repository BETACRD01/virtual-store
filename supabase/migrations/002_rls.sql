-- ============================================================
-- MIGRACIÓN 002: ROW LEVEL SECURITY
-- ============================================================

-- FUNCIÓN is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- FUNCIÓN get_user_role (para frontend)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = user_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- HABILITAR RLS EN TODAS LAS TABLAS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POLÍTICAS: PROFILES
-- ============================================================
CREATE POLICY "users_view_own_profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR is_admin());

CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (
      CASE WHEN role IS DISTINCT FROM 'admin' THEN true
      ELSE (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
      END
    )
  );

CREATE POLICY "admin_manage_profiles" ON profiles
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: CATEGORIES
-- ============================================================
CREATE POLICY "public_view_active_categories" ON categories
  FOR SELECT USING (is_active = true OR is_admin());

CREATE POLICY "admin_manage_categories" ON categories
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: PRODUCTS
-- ============================================================
CREATE POLICY "public_view_active_products" ON products
  FOR SELECT USING (is_active = true OR is_admin());

CREATE POLICY "admin_manage_products" ON products
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: PRODUCT IMAGES
-- ============================================================
CREATE POLICY "public_view_product_images" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "admin_manage_product_images" ON product_images
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: ADDRESSES
-- ============================================================
CREATE POLICY "users_own_addresses" ON addresses
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "users_insert_own_addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_addresses" ON addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "users_delete_own_addresses" ON addresses
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- POLÍTICAS: FAVORITES
-- ============================================================
CREATE POLICY "users_own_favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- POLÍTICAS: CARTS
-- ============================================================
CREATE POLICY "users_own_cart" ON carts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "users_own_cart_items" ON cart_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.user_id = auth.uid())
    OR is_admin()
  );

-- ============================================================
-- POLÍTICAS: ORDERS
-- ============================================================
CREATE POLICY "users_view_own_orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "admin_update_orders" ON orders
  FOR UPDATE USING (is_admin());

CREATE POLICY "admin_all_orders" ON orders
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: ORDER ITEMS
-- ============================================================
CREATE POLICY "users_view_own_order_items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR is_admin()))
  );

CREATE POLICY "admin_all_order_items" ON order_items
  FOR ALL USING (is_admin());

-- ============================================================
-- POLÍTICAS: ORDER STATUS HISTORY
-- ============================================================
CREATE POLICY "users_view_own_order_history" ON order_status_history
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_status_history.order_id AND (orders.user_id = auth.uid() OR is_admin()))
  );

CREATE POLICY "admin_all_order_history" ON order_status_history
  FOR ALL USING (is_admin());
