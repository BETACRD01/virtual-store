export function validateEmail(email) {
  if (!email || typeof email !== 'string') return 'El correo es obligatorio.'
  const trimmed = email.trim()
  if (!trimmed) return 'El correo es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Ingresa un correo válido.'
  return null
}

export function validatePassword(password) {
  if (!password) return 'La contraseña es obligatoria.'
  if (password.length < 8) return 'Mínimo 8 caracteres.'
  if (!/[A-Z]/.test(password)) return 'Debe contener una mayúscula.'
  if (!/[a-z]/.test(password)) return 'Debe contener una minúscula.'
  if (!/[0-9]/.test(password)) return 'Debe contener un número.'
  return null
}

export function validateRequired(value, fieldName) {
  if (value === null || value === undefined) return `${fieldName} es obligatorio.`
  if (typeof value === 'string' && !value.trim()) return `${fieldName} es obligatorio.`
  return null
}

export function validateImageFile(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Solo se permiten imágenes JPG, PNG y WebP.'
  if (file.size > 5 * 1024 * 1024) return 'La imagen no debe superar los 5 MB.'
  return null
}

export function validateForm(data, rules) {
  const errors = {}
  for (const [field, validators] of Object.entries(rules)) {
    for (const validator of validators) {
      const error = validator(data[field])
      if (error) { errors[field] = error; break }
    }
  }
  return Object.keys(errors).length > 0 ? errors : null
}
