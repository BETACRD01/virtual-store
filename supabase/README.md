# Configuración de Supabase

## Migraciones

Ejecutar en orden:

1. `001_schema.sql` — Tablas, índices y triggers
2. `002_rls.sql` — Políticas de seguridad RLS
3. `003_functions.sql` — Funciones RPC (create_order, cancel_order, update_order_status)

## Seed

Ejecutar `seed.sql` para datos de prueba (categorías y productos).

## Crear administrador

1. Registrar un usuario desde la aplicación
2. Ir a Supabase Dashboard → SQL Editor
3. Ejecutar:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@tucorreo.com';
```

## Storage

Crear buckets:

- `product-images` (público)
- `avatars` (público)

## Authentication

Configurar en Supabase Dashboard → Authentication → Settings:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/**`, `https://tuusuario.github.io/nombre-repo/**`
