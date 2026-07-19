const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-jTKzoafw.js","assets/auth-DVs-K_gi.css"])))=>i.map(i=>d[i]);
import{s as o}from"./auth.service-jTKzoafw.js";import{r as l,_ as c}from"./admin.guard--e9Du7_b.js";import{s}from"./dom-Dz1M3mpB.js";import"./notifications-DBxoMB4P.js";const e="/virtual-store/";async function m(){var i;const a=document.getElementById("admin-sidebar");a.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <a href="${e}admin/">📊 Dashboard</a>
        <a href="${e}admin/productos.html">📦 Productos</a>
        <a href="${e}admin/categorias.html">📂 Categorías</a>
        <a href="${e}admin/pedidos.html">📋 Pedidos</a>
        <a href="${e}admin/clientes.html" class="active">👥 Clientes</a>
        <hr style="border-color:rgba(255,255,255,0.1);margin:1rem 0"><a href="${e}index.html">← Tienda</a><a href="#" id="logout-btn">🚪 Salir</a>
      </div>`,(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",async r=>{r.preventDefault();const{authService:t}=await c(async()=>{const{authService:n}=await import("./auth.service-jTKzoafw.js").then(d=>d.b);return{authService:n}},__vite__mapDeps([0,1]));await t.signOut(),window.location.href=`${e}index.html`})}async function h(){await l(),await m();const{data:a,error:i}=await o.from("profiles").select("*, orders:orders(count)").order("created_at",{ascending:!1}),r=document.getElementById("customers-table");if(i){r.innerHTML="<p>Error</p>";return}if(!(a!=null&&a.length)){r.innerHTML='<div class="empty-state"><p>Sin clientes.</p></div>';return}r.innerHTML=`<div class="table-container"><table>
        <thead><tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Registro</th><th>Pedidos</th><th>Rol</th><th>Estado</th></tr></thead>
        <tbody>${a.map(t=>{var n,d;return`<tr>
          <td><strong>${s(t.full_name||"—")}</strong></td>
          <td>${s(t.email||"—")}</td>
          <td>${s(t.phone||"—")}</td>
          <td>${t.created_at?new Date(t.created_at).toLocaleDateString("es-MX"):"—"}</td>
          <td>${((d=(n=t.orders)==null?void 0:n[0])==null?void 0:d.count)||0}</td>
          <td><span class="badge ${t.role==="admin"?"badge-info":"badge-success"}">${t.role}</span></td>
          <td><span class="badge ${t.is_active||t.is_active===null?"badge-success":"badge-danger"}">${t.is_active||t.is_active===null?"Activo":"Inactivo"}</span></td>
        </tr>`}).join("")}</tbody>
      </table></div>`}h();
