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

  const userMenu = user
    ? `<a href="${base}cuenta/perfil.html" title="Mi cuenta" aria-label="Mi cuenta">${profile?.full_name?.[0]?.toUpperCase() || '👤'}</a>`
    : `<a href="${base}login.html" class="btn btn-primary btn-sm">Iniciar sesión</a>`

  let categoriesHtml = ''
  try {
    const cats = await productsService.getActiveCategories()
    categoriesHtml = cats.slice(0, 6).map(c =>
      `<a href="${base}catalogo.html?categoria=${c.id}" data-category-id="${c.id}">${c.name}</a>`
    ).join('')
  } catch {}

  headerEl.innerHTML = `
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menú">☰</button>
          <a href="${base}index.html" class="header-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#2563eb"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/></svg>
            NovaStore
          </a>
          <div class="header-search">
            <span class="header-search-icon">🔍</span>
            <input type="text" id="global-search" placeholder="Buscar productos..." aria-label="Buscar productos">
          </div>
          <div class="header-actions">
            ${role === 'admin' ? `<a href="${base}admin/" title="Panel admin">⚙️</a>` : ''}
            ${userMenu}
            <a href="${base}carrito.html" title="Carrito" aria-label="Carrito de compras">
              🛒
              ${cartCount > 0 ? `<span class="cart-count" id="cart-count">${cartCount > 99 ? '99+' : cartCount}</span>` : ''}
            </a>
          </div>
        </div>
      </div>
    </div>
    <nav class="nav" id="main-nav">
      <div class="container">
        <div class="nav-list">
          <a href="${base}index.html">Inicio</a>
          <a href="${base}catalogo.html">Todos los productos</a>
          ${categoriesHtml}
        </div>
      </div>
    </nav>
  `

  const searchInput = document.getElementById('global-search')
  if (searchInput) {
    let timeout
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const q = searchInput.value.trim()
        window.location.href = `${base}catalogo.html${q ? `?busqueda=${encodeURIComponent(q)}` : ''}`
      }, 500)
    })
  }

  const menuBtn = document.getElementById('mobile-menu-btn')
  const nav = document.getElementById('main-nav')
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'))
  }
}
