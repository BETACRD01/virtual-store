# NovaStore - Tienda Virtual

Tienda virtual completa con autenticación, catálogo, carrito, checkout, panel administrativo y Supabase.

## Tecnologías

- HTML5, CSS3, JavaScript ES Modules
- Supabase (Auth, PostgreSQL, Storage, RLS)
- Chart.js (gráficos administrativos)
- Vite (desarrollo y build)

## Requisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com)

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

Editar `.env` con las credenciales de Supabase (URL y anon key desde Supabase Dashboard → Settings → API).

## Configuración de Supabase

1. Crear proyecto en Supabase
2. Ejecutar migraciones en orden:
   - `supabase/migrations/001_schema.sql`
   - `supabase/migrations/002_rls.sql`
   - `supabase/migrations/003_functions.sql`
3. Ejecutar seed: `supabase/seed.sql`
4. Crear buckets `product-images` y `avatars` en Storage (públicos)
5. Configurar Authentication → Settings:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: añadir URLs locales y de producción

## Ejecución local

```bash
npm run dev
```

## Build

```bash
npm run build
```

La carpeta `dist/` contiene los archivos listos para producción.

## Configurar nombre del repositorio

En `vite.config.js`, el `base` se define mediante la variable de entorno `REPO_NAME`:

```bash
REPO_NAME=nombre-repositorio npm run build
```

Si se omite, `base` será `/` (para dominios personalizados o desarrollo local).

## GitHub Pages

### Opción 1: GitHub Actions (recomendada)

1. Ir a Settings → Pages → Source: "GitHub Actions"
2. Agregar secrets en Settings → Secrets and variables → Actions:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Hacer push a `main` — el workflow despliega automáticamente

### Opción 2: Manual

1. Build: `REPO_NAME=nombre-repositorio npm run build`
2. Subir carpeta `dist/` a la rama `gh-pages`

## Configurar URLs en Supabase para producción

Añadir en Authentication → Settings → Redirect URLs:

```
https://TU-USUARIO.github.io/TU-REPO/**
```

## Crear administrador

Ejecutar en SQL Editor de Supabase:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@tucorreo.com';
```

## Estructura

```
virtual-store/
├── index.html               # Página principal
├── catalogo.html             # Catálogo de productos
├── producto.html             # Detalle del producto
├── carrito.html              # Carrito de compras
├── checkout.html             # Proceso de compra
├── login.html                # Inicio de sesión
├── registro.html             # Registro de usuario
├── recuperar-password.html   # Recuperación de contraseña
├── cuenta/                   # Área del cliente
│   ├── perfil.html
│   ├── direcciones.html
│   ├── pedidos.html
│   ├── detalle-pedido.html
│   └── favoritos.html
├── admin/                    # Panel administrativo
│   ├── index.html            # Dashboard
│   ├── productos.html
│   ├── producto-formulario.html
│   ├── categorias.html
│   ├── pedidos.html
│   ├── detalle-pedido.html
│   └── clientes.html
├── src/
│   ├── css/                  # Estilos
│   ├── js/
│   │   ├── config/           # Configuración Supabase
│   │   ├── services/         # Servicios (auth, products, cart, etc.)
│   │   ├── guards/           # Guards de autenticación
│   │   ├── components/       # Componentes reutilizables
│   │   └── utils/            # Utilidades
│   └── assets/
├── supabase/
│   ├── migrations/           # Migraciones SQL
│   └── seed.sql              # Datos de prueba
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Seguridad

- RLS (Row Level Security) activo en todas las tablas
- Roles validados desde base de datos, no desde localStorage
- Políticas que impiden que clientes modifiquen su propio rol
- Funciones RPC seguras para creación y cancelación de pedidos
- Precios calculados en servidor, no confiar en datos del navegador
- Sin `SUPABASE_SERVICE_ROLE_KEY` en frontend
- Contraseñas manejadas exclusivamente por Supabase Auth
