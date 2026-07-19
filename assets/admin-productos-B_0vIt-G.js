const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-BfASCOUI.js","assets/auth-DVs-K_gi.css"])))=>i.map(i=>d[i]);
import{s as n}from"./auth.service-BfASCOUI.js";import{r as m,_ as u}from"./admin.guard-BTP4FHZC.js";import{f as c}from"./currency-BUz-WTj3.js";import{s as l}from"./dom-Dz1M3mpB.js";import{a as h}from"./notifications-DBxoMB4P.js";const a="/virtual-store/";async function f(){var e;const o=document.getElementById("admin-sidebar");o.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <a href="${a}admin/">📊 Dashboard</a>
        <a href="${a}admin/productos.html" class="active">📦 Productos</a>
        <a href="${a}admin/categorias.html">📂 Categorías</a>
        <a href="${a}admin/pedidos.html">📋 Pedidos</a>
        <a href="${a}admin/clientes.html">👥 Clientes</a>
        <hr style="border-color:rgba(255,255,255,0.1);margin:1rem 0"><a href="${a}index.html">← Tienda</a><a href="#" id="logout-btn">🚪 Salir</a>
      </div>`,(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async d=>{d.preventDefault();const{authService:i}=await u(async()=>{const{authService:t}=await import("./auth.service-BfASCOUI.js").then(r=>r.b);return{authService:t}},__vite__mapDeps([0,1]));await i.signOut(),window.location.href=`${a}index.html`})}async function v(){await m(),await f();async function o(){const{data:e,error:d}=await n.from("products").select("*, category:categories(name)").order("created_at",{ascending:!1});if(d){document.getElementById("products-table").innerHTML=`<p>Error: ${d.message}</p>`;return}const i=document.getElementById("products-table");if(!(e!=null&&e.length)){i.innerHTML='<div class="empty-state"><p>No hay productos.</p></div>';return}i.innerHTML=`<div class="table-container"><table>
          <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>${e.map(t=>{var r;return`<tr>
            <td><a href="${a}admin/producto-formulario.html?id=${t.id}" style="color:var(--color-primary)">${l(t.name)}</a></td>
            <td>${l(((r=t.category)==null?void 0:r.name)||"—")}</td>
            <td>${c(t.offer_price||t.price)}${t.offer_price?` <span style="font-size:0.75rem;color:var(--color-gray-400);text-decoration:line-through">${c(t.price)}</span>`:""}</td>
            <td>${t.stock} ${t.stock<=t.minimum_stock?'<span class="badge badge-danger">Bajo</span>':""}</td>
            <td><span class="badge ${t.is_active?"badge-success":"badge-danger"}">${t.is_active?"Activo":"Inactivo"}</span></td>
            <td style="display:flex;gap:0.5rem">
              <a href="${a}admin/producto-formulario.html?id=${t.id}" class="btn btn-sm btn-outline">Editar</a>
              <button class="btn btn-sm ${t.is_active?"btn-secondary":"btn-primary"} toggle-product" data-id="${t.id}" data-active="${t.is_active}">${t.is_active?"Desactivar":"Activar"}</button>
            </td>
          </tr>`}).join("")}</tbody>
        </table></div>`,i.querySelectorAll(".toggle-product").forEach(t=>t.addEventListener("click",async()=>{const r=t.dataset.id,s=t.dataset.active==="true";await n.from("products").update({is_active:!s}).eq("id",r),h(s?"Producto desactivado.":"Producto activado."),o()}))}o()}v();
