const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-BxJS2Ta1.js","assets/auth-Azh6cvs6.css"])))=>i.map(i=>d[i]);
import{s as n}from"./auth.service-BxJS2Ta1.js";import{r as m,_ as u}from"./admin.guard-BNG6i5Q6.js";import{f as c}from"./currency-BUz-WTj3.js";import{s as l}from"./dom-Dz1M3mpB.js";import{a as h}from"./notifications-DBxoMB4P.js";const a="/virtual-store/";async function v(){var e;const o=document.getElementById("admin-sidebar");o.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <div class="admin-sidebar-section">Menú</div>
        <a href="${a}admin/">📊 Dashboard</a>
        <a href="${a}admin/productos.html" class="active">📦 Productos</a>
        <a href="${a}admin/categorias.html">📂 Categorías</a>
        <a href="${a}admin/pedidos.html">📋 Pedidos</a>
        <a href="${a}admin/clientes.html">👥 Clientes</a>
        <div class="admin-sidebar-section">General</div>
        <a href="${a}index.html">← Ver tienda</a>
        <a href="#" id="logout-btn">🚪 Cerrar sesión</a>
      </div>`,(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async d=>{d.preventDefault();const{authService:r}=await u(async()=>{const{authService:t}=await import("./auth.service-BxJS2Ta1.js").then(i=>i.b);return{authService:t}},__vite__mapDeps([0,1]));await r.signOut(),window.location.href=`${a}index.html`})}async function f(){await m(),await v();async function o(){const{data:e,error:d}=await n.from("products").select("*, category:categories(name)").order("created_at",{ascending:!1});if(d){document.getElementById("products-table").innerHTML=`<p>Error: ${d.message}</p>`;return}const r=document.getElementById("products-table");if(!(e!=null&&e.length)){r.innerHTML='<div class="empty-state"><p>No hay productos.</p></div>';return}r.innerHTML=`<div class="table-container"><table>
          <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>${e.map(t=>{var i;return`<tr>
            <td><a href="${a}admin/producto-formulario.html?id=${t.id}" style="color:var(--color-primary)">${l(t.name)}</a></td>
            <td>${l(((i=t.category)==null?void 0:i.name)||"—")}</td>
            <td>${c(t.offer_price||t.price)}${t.offer_price?` <span style="font-size:0.75rem;color:var(--color-gray-400);text-decoration:line-through">${c(t.price)}</span>`:""}</td>
            <td>${t.stock} ${t.stock<=t.minimum_stock?'<span class="badge badge-danger">Bajo</span>':""}</td>
            <td><span class="badge ${t.is_active?"badge-success":"badge-danger"}">${t.is_active?"Activo":"Inactivo"}</span></td>
            <td style="display:flex;gap:0.5rem">
              <a href="${a}admin/producto-formulario.html?id=${t.id}" class="btn btn-sm btn-outline">Editar</a>
              <button class="btn btn-sm ${t.is_active?"btn-secondary":"btn-primary"} toggle-product" data-id="${t.id}" data-active="${t.is_active}">${t.is_active?"Desactivar":"Activar"}</button>
            </td>
          </tr>`}).join("")}</tbody>
        </table></div>`,r.querySelectorAll(".toggle-product").forEach(t=>t.addEventListener("click",async()=>{const i=t.dataset.id,s=t.dataset.active==="true";await n.from("products").update({is_active:!s}).eq("id",i),h(s?"Producto desactivado.":"Producto activado."),o()}))}o()}f();
