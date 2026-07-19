export function loadFooter() {
  const footerEl = document.getElementById('main-footer')
  if (!footerEl) return
  const base = import.meta.env.BASE_URL
  footerEl.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>NovaStore</h3>
            <p style="font-size:0.875rem;line-height:1.6">Tu tienda de confianza con los mejores productos y los mejores precios.</p>
          </div>
          <div>
            <h3>Tienda</h3>
            <a href="${base}index.html">Inicio</a>
            <a href="${base}pagina/catalogo.html">Catálogo</a>
            <a href="${base}pagina/catalogo.html?ofertas=true">Ofertas</a>
          </div>
          <div>
            <h3>Mi cuenta</h3>
            <a href="${base}auth/login.html">Iniciar sesión</a>
            <a href="${base}auth/registro.html">Registrarse</a>
            <a href="${base}cuenta/pedidos.html">Mis pedidos</a>
          </div>
          <div>
            <h3>Contacto</h3>
            <p style="font-size:0.875rem">contacto@novastore.com</p>
            <p style="font-size:0.875rem">+52 55 1234 5678</p>
            <p style="font-size:0.875rem">Lun - Vie: 9:00 - 18:00</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} NovaStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `
}
