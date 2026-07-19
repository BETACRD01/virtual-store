import { authService } from '../services/auth.service.js'
import { cartService } from '../services/cart.service.js'
import { productsService } from '../services/products.service.js'

export async function loadHeader() {
  const headerEl = document.getElementById('main-header')
  if (!headerEl) return

  const base = import.meta.env.BASE_URL

  const session = await authService.getSession()
  const user = session?.user
  const profile = user ? await authService.getProfile(user.id) : null
  const role = profile?.role || 'customer'

  let cartCount = 0
  try {
    const cart = await cartService.getCart(user?.id)
    cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  } catch {}

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() || '?'

  const userMenu = user
    ? `<div class="user-menu-wrapper">
        <button class="header-avatar" id="user-menu-btn" aria-label="Menú de usuario">${initials}</button>
        <div class="user-dropdown" id="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-avatar">${initials}</div>
            <div>
              <div class="user-dropdown-name">${profile?.full_name || 'Usuario'}</div>
              <div class="user-dropdown-email">${user.email}</div>
            </div>
          </div>
          <div class="user-dropdown-divider"></div>
          <a href="${base}cuenta/perfil.html" class="user-dropdown-item">👤 Mi perfil</a>
          <a href="${base}cuenta/pedidos.html" class="user-dropdown-item">📦 Mis pedidos</a>
          <a href="${base}cuenta/direcciones.html" class="user-dropdown-item">📍 Direcciones</a>
          <a href="${base}cuenta/favoritos.html" class="user-dropdown-item">♥ Favoritos</a>
          ${role === 'admin' ? `<div class="user-dropdown-divider"></div><a href="${base}admin/" class="user-dropdown-item">⚙️ Panel admin</a>` : ''}
          <div class="user-dropdown-divider"></div>
          <button class="user-dropdown-item" id="logout-btn">🚪 Cerrar sesión</button>
        </div>
      </div>`
    : `<a href="${base}auth/login.html" class="btn btn-primary btn-sm" style="padding:0.5rem 1.25rem;font-size:0.8rem">Iniciar sesión</a>`

  let categoriesHtml = ''
  try {
    const cats = await productsService.getActiveCategories()
    categoriesHtml = cats.slice(0, 6).map(c =>
      `<a href="${base}pagina/catalogo.html?categoria=${c.id}" data-category-id="${c.id}">${c.name}</a>`
    ).join('')
  } catch {}

  headerEl.innerHTML = `
    <div class="header" id="site-header">
      <div class="container">
        <div class="header-inner">
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menú">☰</button>
          <a href="${base}index.html" class="header-logo">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="url(#logo-grad)"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/><defs><linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs></svg>
            NovaStore
          </a>
          <div class="header-search">
            <span class="header-search-icon">🔍</span>
            <input type="text" id="global-search" placeholder="Buscar productos..." aria-label="Buscar productos">
          </div>
          <div class="header-actions">
            <a href="${base}pagina/carrito.html" class="header-action-btn" title="Carrito" aria-label="Carrito de compras">
              🛒
              ${cartCount > 0 ? `<span class="cart-count" id="cart-count">${cartCount > 99 ? '99+' : cartCount}</span>` : ''}
            </a>
            ${userMenu}
          </div>
        </div>
      </div>
    </div>
    <nav class="nav" id="main-nav">
      <div class="container">
        <div class="nav-list" id="nav-list">
          <a href="${base}index.html">Inicio</a>
          <a href="${base}pagina/catalogo.html">Todos los productos</a>
          ${categoriesHtml}
        </div>
      </div>
    </nav>
  `

  const headerEl2 = document.getElementById('site-header')
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY
    if (currentScroll > 20) {
      headerEl2.classList.add('scrolled')
    } else {
      headerEl2.classList.remove('scrolled')
    }
    lastScroll = currentScroll
  })

  const searchInput = document.getElementById('global-search')
  if (searchInput) {
    let timeout
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const q = searchInput.value.trim()
        window.location.href = `${base}pagina/catalogo.html${q ? `?busqueda=${encodeURIComponent(q)}` : ''}`
      }, 500)
    })
  }

  const menuBtn = document.getElementById('mobile-menu-btn')
  const nav = document.getElementById('main-nav')
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'))
  }

  const userMenuBtn = document.getElementById('user-menu-btn')
  const userDropdown = document.getElementById('user-dropdown')
  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      userDropdown.classList.toggle('open')
    })
    document.addEventListener('click', () => userDropdown.classList.remove('open'))
    userDropdown.addEventListener('click', (e) => e.stopPropagation())
  }

  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authService.signOut()
      window.location.href = `${base}index.html`
    })
  }
}
