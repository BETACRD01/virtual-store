import { authService } from '../services/auth.service.js'

export async function loadAccountSidebar(active) {
  const el = document.getElementById('account-sidebar')
  if (!el) return
  const base = import.meta.env.BASE_URL
  const session = await authService.getSession()
  const role = session ? await authService.getUserRole(session.user.id) : 'customer'

  const links = [
    { href: `${base}cuenta/perfil.html`, label: '👤 Mi perfil', id: 'perfil' },
    { href: `${base}cuenta/direcciones.html`, label: '📍 Mis direcciones', id: 'direcciones' },
    { href: `${base}cuenta/pedidos.html`, label: '📦 Mis pedidos', id: 'pedidos' },
    { href: `${base}cuenta/favoritos.html`, label: '♥ Favoritos', id: 'favoritos' },
  ]
  if (role === 'admin') {
    links.push({ href: `${base}admin/`, label: '⚙️ Panel admin', id: 'admin' })
  }
  links.push({ href: `${base}index.html`, label: '← Volver a tienda', id: 'back' })

  el.innerHTML = `<div class="account-sidebar">
    ${links.map(l => `<a href="${l.href}" class="${l.id === active ? 'active' : ''}">${l.label}</a>`).join('')}
    <a href="#" id="logout-btn">🚪 Cerrar sesión</a>
  </div>`

  document.getElementById('logout-btn')?.addEventListener('click', async (e) => {
    e.preventDefault()
    await authService.signOut()
    window.location.href = `${base}index.html`
  })
}
