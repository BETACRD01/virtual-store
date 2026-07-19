import { defineConfig } from 'vite';
import { resolve } from 'path';

const repoName = process.env.REPO_NAME || '';

export default defineConfig({
  base: repoName ? `/${repoName}/` : '/',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'pagina-catalogo': resolve(__dirname, 'pagina/catalogo.html'),
        'pagina-producto': resolve(__dirname, 'pagina/producto.html'),
        'pagina-carrito': resolve(__dirname, 'pagina/carrito.html'),
        'pagina-checkout': resolve(__dirname, 'pagina/checkout.html'),
        'auth-login': resolve(__dirname, 'auth/login.html'),
        'auth-registro': resolve(__dirname, 'auth/registro.html'),
        'auth-recuperar-password': resolve(__dirname, 'auth/recuperar-password.html'),
        'perfil': resolve(__dirname, 'cuenta/perfil.html'),
        'direcciones': resolve(__dirname, 'cuenta/direcciones.html'),
        'pedidos': resolve(__dirname, 'cuenta/pedidos.html'),
        'detalle-pedido': resolve(__dirname, 'cuenta/detalle-pedido.html'),
        'favoritos': resolve(__dirname, 'cuenta/favoritos.html'),
        'admin-index': resolve(__dirname, 'admin/index.html'),
        'admin-productos': resolve(__dirname, 'admin/productos.html'),
        'admin-producto-formulario': resolve(__dirname, 'admin/producto-formulario.html'),
        'admin-categorias': resolve(__dirname, 'admin/categorias.html'),
        'admin-pedidos': resolve(__dirname, 'admin/pedidos.html'),
        'admin-detalle-pedido': resolve(__dirname, 'admin/detalle-pedido.html'),
        'admin-clientes': resolve(__dirname, 'admin/clientes.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
