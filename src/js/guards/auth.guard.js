import { authService } from '../services/auth.service.js'

export async function requireAuth() {
  const session = await authService.getSession()
  if (!session) {
    window.location.href = `${import.meta.env.BASE_URL}auth/login.html?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`
    return null
  }
  return session
}

export async function redirectIfAuth() {
  const session = await authService.getSession()
  if (session) {
    const role = await authService.getUserRole(session.user.id)
    window.location.href = role === 'admin' ? `${import.meta.env.BASE_URL}admin/` : `${import.meta.env.BASE_URL}cuenta/perfil.html`
  }
}
