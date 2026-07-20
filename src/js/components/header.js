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

  let categoriesHtml = ''
  let allCategories = []
  try {
    allCategories = await productsService.getActiveCategories()
    const catIcons = ['📱', '💻', '👗', '👟', '🏠', '💄', '⚽', '📚', '🧸', '🔧', '🎵', '🐾', '⌚', '💎', '🎮', '🚗', '🏕️', '🍷', '💊', '✈️']
    categoriesHtml = allCategories.slice(0, 6).map((c, i) =>
      `<a href="${base}pagina/catalogo.html?categoria=${c.id}"><span class="cat-icon">${catIcons[i % catIcons.length]}</span>${c.name}</a>`
    ).join('')
  } catch {}

  const cartBadge = cartCount > 0
    ? `<span class="ae-cart-badge" id="cart-count">${cartCount > 99 ? '99+' : cartCount}</span>`
    : ''

  const userContent = user
    ? `<button class="ae-header-btn" id="user-menu-btn" title="Mi cuenta">
        <span class="ae-btn-icon">${initials}</span>
        <span class="ae-btn-label">Perfil</span>
      </button>
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
      </div>`
    : `<a href="${base}auth/login.html" class="ae-header-btn">
        <span class="ae-btn-icon">👤</span>
        <span class="ae-btn-label">Acceder</span>
      </a>`

  const megaMenuHtml = allCategories.length > 0
    ? `<div class="ae-nav-dropdown" id="mega-dropdown">
        ${allCategories.map((c, i) => {
          const icons = ['📱', '💻', '👗', '👟', '🏠', '💄', '⚽', '📚', '🧸', '🔧', '🎵', '🐾', '⌚', '💎', '🎮', '🚗', '🏕️', '🍷', '💊', '✈️']
          return `<a href="${base}pagina/catalogo.html?categoria=${c.id}"><span class="cat-icon">${icons[i % icons.length]}</span>${c.name}</a>`
        }).join('')}
      </div>`
    : ''

  headerEl.innerHTML = `
    <div class="ae-top-bar">
      <div class="ae-top-bar-inner">
        <a href="#">Envío a <strong>República Dominicana</strong></a>
        <a href="#">ESP</a>
        <a href="#">USD</a>
        <a href="#">Ayuda</a>
      </div>
    </div>
    <div class="ae-header" id="site-header">
      <div class="ae-header-inner">
        <button class="ae-menu-btn" id="ae-menu-btn" aria-label="Menú">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="${base}index.html" class="ae-logo">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#f79917"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/><defs><linearGradient id="logo-grad2" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#f79917"/><stop offset="1" stop-color="#e88f0f"/></linearGradient></defs></svg>
          <span class="ae-logo-text">NovaStore</span>
        </a>
        <div class="ae-search-wrap">
          <input type="text" id="global-search" placeholder="Buscar en NovaStore..." aria-label="Buscar productos">
          <button class="ae-search-btn" id="search-submit" aria-label="Buscar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
        <div class="ae-header-actions">
          <a href="${base}pagina/carrito.html" class="ae-header-btn" title="Carrito">
            <span class="ae-btn-icon" style="position:relative">
              🛒
              ${cartBadge}
            </span>
            <span class="ae-btn-label">Carrito</span>
          </a>
          ${userContent}
        </div>
      </div>
    </div>
    <nav class="ae-nav" id="ae-nav">
      <button class="ae-nav-close" id="ae-nav-close">✕</button>
      <div class="ae-nav-inner" id="ae-nav-inner">
        <div class="ae-nav-item">
          <button class="ae-nav-link" id="cat-trigger">
            📦 Categorías
            <span class="nav-arrow">▼</span>
          </button>
          ${megaMenuHtml}
        </div>
        <a href="${base}index.html" class="ae-nav-link">Inicio</a>
        <a href="${base}pagina/catalogo.html" class="ae-nav-link">Todos los productos</a>
        ${allCategories.slice(0, 5).map(c => `<a href="${base}pagina/catalogo.html?categoria=${c.id}" class="ae-nav-link">${c.name}</a>`).join('')}
        <a href="${base}pagina/catalogo.html?ofertas=true" class="ae-nav-link" style="color:#e52f20;font-weight:700">🔥 Ofertas</a>
      </div>
    </nav>
    <div class="mobile-search-overlay" id="mobile-search-overlay">
      <div class="search-overlay-inner">
        <input type="text" id="mobile-search-input" placeholder="Buscar en NovaStore..." autofocus>
        <button class="search-close-btn" id="mobile-search-close">✕</button>
      </div>
    </div>
    <div class="tab-bar" id="tab-bar">
      <div class="tab-bar-inner">
        <a href="${base}index.html" class="tab-bar-item ${window.location.pathname.endsWith('index.html') || window.location.pathname.replace(base, '').replace(/\/$/, '') === '' ? 'active' : ''}">
          <span class="tab-icon">🏠</span>
          <span class="tab-label">Inicio</span>
        </a>
        <a href="${base}pagina/catalogo.html" class="tab-bar-item ${window.location.pathname.includes('catalogo') ? 'active' : ''}">
          <span class="tab-icon">🛍️</span>
          <span class="tab-label">Catálogo</span>
        </a>
        <a href="${base}pagina/carrito.html" class="tab-bar-item ${window.location.pathname.includes('carrito') ? 'active' : ''}">
          <span class="tab-icon">🛒</span>
          <span class="tab-label">Carrito</span>
          ${cartCount > 0 ? `<span class="tab-badge" id="tab-cart-badge">${cartCount > 99 ? '99+' : cartCount}</span>` : ''}
        </a>
        <a href="${base}cuenta/favoritos.html" class="tab-bar-item ${window.location.pathname.includes('favoritos') ? 'active' : ''}">
          <span class="tab-icon">♥</span>
          <span class="tab-label">Favs</span>
        </a>
        <a href="${user ? base + 'cuenta/perfil.html' : base + 'auth/login.html'}" class="tab-bar-item ${window.location.pathname.includes('cuenta') || window.location.pathname.includes('perfil') ? 'active' : ''}">
          <span class="tab-icon">👤</span>
          <span class="tab-label">Perfil</span>
        </a>
      </div>
    </div>
  `

  document.body.classList.add('has-tab-bar')

  /* --- Search --- */
  const searchInput = document.getElementById('global-search')
  if (searchInput) {
    let timeout
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const q = searchInput.value.trim()
        if (q) window.location.href = `${base}pagina/catalogo.html?busqueda=${encodeURIComponent(q)}`
      }, 500)
    })
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        clearTimeout(timeout)
        const q = searchInput.value.trim()
        if (q) window.location.href = `${base}pagina/catalogo.html?busqueda=${encodeURIComponent(q)}`
      }
    })
  }
  document.getElementById('search-submit')?.addEventListener('click', () => {
    const q = searchInput?.value.trim()
    if (q) window.location.href = `${base}pagina/catalogo.html?busqueda=${encodeURIComponent(q)}`
  })

  /* --- Mobile menu --- */
  const menuBtn = document.getElementById('ae-menu-btn')
  const nav = document.getElementById('ae-nav')
  const navClose = document.getElementById('ae-nav-close')
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open-mobile')
      document.body.style.overflow = nav.classList.contains('open-mobile') ? 'hidden' : ''
    })
    if (navClose) {
      navClose.addEventListener('click', () => {
        nav.classList.remove('open-mobile')
        document.body.style.overflow = ''
      })
    }
    nav.addEventListener('click', (e) => {
      if (e.target === nav) {
        nav.classList.remove('open-mobile')
        document.body.style.overflow = ''
      }
    })
  }

  /* --- User dropdown --- */
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

  /* --- Logout --- */
  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await authService.signOut()
      window.location.href = `${base}index.html`
    })
  }

  /* --- Mobile search overlay --- */
  const searchBtn = document.getElementById('mobile-search-btn')
  const searchOverlay = document.getElementById('mobile-search-overlay')
  const mobileSearchInput = document.getElementById('mobile-search-input')
  const searchCloseBtn = document.getElementById('mobile-search-close')
  if (searchBtn && searchOverlay && mobileSearchInput && searchCloseBtn) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('open')
      setTimeout(() => mobileSearchInput.focus(), 100)
    })
    searchCloseBtn.addEventListener('click', () => searchOverlay.classList.remove('open'))
    let timeout
    mobileSearchInput.addEventListener('input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const q = mobileSearchInput.value.trim()
        if (q) window.location.href = `${base}pagina/catalogo.html?busqueda=${encodeURIComponent(q)}`
      }, 500)
    })
    mobileSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(timeout)
        const q = mobileSearchInput.value.trim()
        if (q) window.location.href = `${base}pagina/catalogo.html?busqueda=${encodeURIComponent(q)}`
        else searchOverlay.classList.remove('open')
      }
    })
  }

  /* --- Tab cart badge bump --- */
  const tabBadge = document.getElementById('tab-cart-badge')
  if (tabBadge) tabBadge.classList.add('bump')
}
