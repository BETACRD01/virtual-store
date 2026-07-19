const errorMessages = {
  session_expired: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
  network_error: 'Error de conexión. Verifica tu internet.',
  duplicate_email: 'Este correo ya está registrado.',
  invalid_credentials: 'Correo o contraseña incorrectos.',
  product_not_found: 'El producto no existe.',
  product_inactive: 'El producto no está disponible.',
  insufficient_stock: 'Stock insuficiente.',
  unauthorized: 'No tienes permiso para realizar esta acción.',
  validation_error: 'Verifica los datos ingresados.',
  upload_error: 'Error al subir la imagen.',
  weak_password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
  user_not_found: 'Usuario no encontrado.',
  order_not_found: 'Pedido no encontrado.',
  cart_empty: 'El carrito está vacío.',
  invalid_file_type: 'Solo se permiten imágenes JPG, PNG y WebP.',
  file_too_large: 'La imagen no debe superar los 5 MB.',
}

export function getUserErrorMessage(error) {
  if (!error) return 'Ocurrió un error inesperado.'
  const message = error.message || error.error_description || ''
  const code = error.code || ''
  if (code === '23505' || message.includes('duplicate key') || message.includes('already registered')) return errorMessages.duplicate_email
  if (message.includes('Invalid login credentials')) return errorMessages.invalid_credentials
  if (message.includes('JWT') || message.includes('expired') || message.includes('token')) return errorMessages.session_expired
  if (code === '42501' || message.includes('permission denied')) return errorMessages.unauthorized
  if (message.includes('password') && message.includes('characters')) return errorMessages.weak_password
  if (code === 'PGRST116') return errorMessages.product_not_found
  if (import.meta.env.DEV) console.error('[Error Detail]:', error)
  return errorMessages.network_error
}
