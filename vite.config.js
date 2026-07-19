import { defineConfig } from 'vite';
import { resolve } from 'path';

const repoName = process.env.REPO_NAME || '';

export default defineConfig({
  base: repoName ? `/${repoName}/` : '/',
  root: 'pages',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'pages/index.html'),
        'pagina-catalogo': resolve(__dirname, 'pages/pagina/catalogo.html'),
        'pagina-producto': resolve(__dirname, 'pages/pagina/producto.html'),
        'pagina-carrito': resolve(__dirname, 'pages/pagina/carrito.html'),
        'pagina-checkout': resolve(__dirname, 'pages/pagina/checkout.html'),
        'auth-login': resolve(__dirname, 'pages/auth/login.html'),
        'auth-registro': resolve(__dirname, 'pages/auth/registro.html'),
        'auth-recuperar-password': resolve(__dirname, 'pages/auth/recuperar-password.html'),
        'perfil': resolve(__dirname, 'pages/cuenta/perfil.html'),
        'direcciones': resolve(__dirname, 'pages/cuenta/direcciones.html'),
        'pedidos': resolve(__dirname, 'pages/cuenta/pedidos.html'),
        'detalle-pedido': resolve(__dirname, 'pages/cuenta/detalle-pedido.html'),
        'favoritos': resolve(__dirname, 'pages/cuenta/favoritos.html'),
        'admin-index': resolve(__dirname, 'pages/admin/index.html'),
        'admin-productos': resolve(__dirname, 'pages/admin/productos.html'),
        'admin-producto-formulario': resolve(__dirname, 'pages/admin/producto-formulario.html'),
        'admin-categorias': resolve(__dirname, 'pages/admin/categorias.html'),
        'admin-pedidos': resolve(__dirname, 'pages/admin/pedidos.html'),
        'admin-detalle-pedido': resolve(__dirname, 'pages/admin/detalle-pedido.html'),
        'admin-clientes': resolve(__dirname, 'pages/admin/clientes.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
