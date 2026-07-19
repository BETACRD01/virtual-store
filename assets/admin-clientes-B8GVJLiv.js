const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-DJHmt2aS.js","assets/auth-acGcELYW.css"])))=>i.map(i=>d[i]);
import{s as o}from"./auth.service-DJHmt2aS.js";import{r as l,_ as c}from"./admin.guard-BoCWU37E.js";import{s as d}from"./dom-Dz1M3mpB.js";import"./notifications-DBxoMB4P.js";const e="/virtual-store/";async function m(){var s;const a=document.getElementById("admin-sidebar");a.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <div class="admin-sidebar-section">Menú</div>
        <a href="${e}admin/">📊 Dashboard</a>
        <a href="${e}admin/productos.html">📦 Productos</a>
        <a href="${e}admin/categorias.html">📂 Categorías</a>
        <a href="${e}admin/pedidos.html">📋 Pedidos</a>
        <a href="${e}admin/clientes.html" class="active">👥 Clientes</a>
        <div class="admin-sidebar-section">General</div>
        <a href="${e}index.html">← Ver tienda</a>
        <a href="#" id="logout-btn">🚪 Cerrar sesión</a>
      </div>`,(s=document.getElementById("logout-btn"))==null||s.addEventListener("click",async i=>{i.preventDefault();const{authService:t}=await c(async()=>{const{authService:n}=await import("./auth.service-DJHmt2aS.js").then(r=>r.b);return{authService:n}},__vite__mapDeps([0,1]));await t.signOut(),window.location.href=`${e}index.html`})}async function h(){await l(),await m();const{data:a,error:s}=await o.from("profiles").select("*, orders:orders(count)").order("created_at",{ascending:!1}),i=document.getElementById("customers-table");if(s){i.innerHTML="<p>Error</p>";return}if(!(a!=null&&a.length)){i.innerHTML='<div class="empty-state"><p>Sin clientes.</p></div>';return}i.innerHTML=`<div class="table-container"><table>
        <thead><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Registro</th><th>Pedidos</th><th>Rol</th><th>Estado</th></tr></thead>
        <tbody>${a.map(t=>{var n,r;return`<tr>
          <td><strong>${d(t.full_name||"—")}</strong></td>
          <td>${d(t.email||"—")}</td>
          <td>${d(t.phone||"—")}</td>
          <td>${t.created_at?new Date(t.created_at).toLocaleDateString("es-MX"):"—"}</td>
          <td>${((r=(n=t.orders)==null?void 0:n[0])==null?void 0:r.count)||0}</td>
          <td><span class="badge ${t.role==="admin"?"badge-info":"badge-success"}">${t.role}</span></td>
          <td><span class="badge ${t.is_active||t.is_active===null?"badge-success":"badge-danger"}">${t.is_active||t.is_active===null?"Activo":"Inactivo"}</span></td>
        </tr>`}).join("")}</tbody>
      </table></div>`}h();
