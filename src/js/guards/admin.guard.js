import { authService } from '../services/auth.service.js'

export async function requireAdmin() {
  const session = await authService.getSession()
  if (!session) {
    window.location.href = `${import.meta.env.BASE_URL}auth/login.html?redirect=${encodeURIComponent(window.location.pathname)}`
    return null
  }
  const role = await authService.getUserRole(session.user.id)
  if (role !== 'admin') {
    window.location.href = `${import.meta.env.BASE_URL}index.html`
    return null
  }
  return session
}
