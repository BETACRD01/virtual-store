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
        catalogo: resolve(__dirname, 'catalogo.html'),
        producto: resolve(__dirname, 'producto.html'),
        carrito: resolve(__dirname, 'carrito.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        login: resolve(__dirname, 'login.html'),
        registro: resolve(__dirname, 'registro.html'),
        'recuperar-password': resolve(__dirname, 'recuperar-password.html'),
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
