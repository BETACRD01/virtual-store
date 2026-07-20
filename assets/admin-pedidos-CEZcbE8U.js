const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-COov5E7B.js","assets/auth-BpzVQfvl.css"])))=>i.map(i=>d[i]);
import{s}from"./auth.service-COov5E7B.js";import{r as o,_ as l}from"./admin.guard-RYhFZxhD.js";import{f as c}from"./currency-BUz-WTj3.js";import{s as m}from"./dom-Dz1M3mpB.js";const t="/virtual-store/";async function h(){var d;const a=document.getElementById("admin-sidebar");a.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <div class="admin-sidebar-section">Menú</div>
        <a href="${t}admin/">📊 Dashboard</a>
        <a href="${t}admin/productos.html">📦 Productos</a>
        <a href="${t}admin/categorias.html">📂 Categorías</a>
        <a href="${t}admin/pedidos.html" class="active">📋 Pedidos</a>
        <a href="${t}admin/clientes.html">👥 Clientes</a>
        <div class="admin-sidebar-section">General</div>
        <a href="${t}index.html">← Ver tienda</a>
        <a href="#" id="logout-btn">🚪 Cerrar sesión</a>
      </div>`,(d=document.getElementById("logout-btn"))==null||d.addEventListener("click",async r=>{r.preventDefault();const{authService:n}=await l(async()=>{const{authService:e}=await import("./auth.service-COov5E7B.js").then(i=>i.b);return{authService:e}},__vite__mapDeps([0,1]));await n.signOut(),window.location.href=`${t}index.html`})}async function u(){await o(),await h();const{data:a,error:d}=await s.from("orders").select("*, profile:user_id(full_name)").order("created_at",{ascending:!1}),r=document.getElementById("orders-table");if(d){r.innerHTML="<p>Error</p>";return}if(!(a!=null&&a.length)){r.innerHTML='<div class="empty-state"><p>Sin pedidos.</p></div>';return}const n=e=>e==="delivered"?"badge-success":e==="cancelled"?"badge-danger":"badge-warning";r.innerHTML=`<div class="table-container"><table>
        <thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
        <tbody>${a.map(e=>{var i;return`<tr>
          <td><a href="${t}admin/detalle-pedido.html?id=${e.id}" style="color:var(--color-primary)">${e.order_number}</a></td>
          <td>${m(((i=e.profile)==null?void 0:i.full_name)||"—")}</td>
          <td>${new Date(e.created_at).toLocaleDateString("es-MX")}</td>
          <td>${c(e.total)}</td>
          <td><span class="badge ${n(e.status)}">${e.status}</span></td>
        </tr>`}).join("")}</tbody>
      </table></div>`}u();
