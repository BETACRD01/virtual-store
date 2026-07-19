const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-C3JQ1Rkv.js","assets/auth-DVs-K_gi.css"])))=>i.map(i=>d[i]);
import{s as o}from"./auth.service-C3JQ1Rkv.js";import{r as u,_ as g}from"./admin.guard-B9R4p4sE.js";import{s as l}from"./dom-Dz1M3mpB.js";import{s as p,a as c}from"./notifications-DBxoMB4P.js";const s="/virtual-store/";async function v(){var i;const a=document.getElementById("admin-sidebar");a.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <a href="${s}admin/">📊 Dashboard</a>
        <a href="${s}admin/productos.html">📦 Productos</a>
        <a href="${s}admin/categorias.html" class="active">📂 Categorías</a>
        <a href="${s}admin/pedidos.html">📋 Pedidos</a>
        <a href="${s}admin/clientes.html">👥 Clientes</a>
        <hr style="border-color:rgba(255,255,255,0.1);margin:1rem 0"><a href="${s}index.html">← Tienda</a><a href="#" id="logout-btn">🚪 Salir</a>
      </div>`,(i=document.getElementById("logout-btn"))==null||i.addEventListener("click",async e=>{e.preventDefault();const{authService:t}=await g(async()=>{const{authService:n}=await import("./auth.service-C3JQ1Rkv.js").then(r=>r.b);return{authService:n}},__vite__mapDeps([0,1]));await t.signOut(),window.location.href=`${s}index.html`})}async function d(){const{data:a,error:i}=await o.from("categories").select("*").order("name");if(i){document.getElementById("categories-table").innerHTML="<p>Error</p>";return}const e=document.getElementById("categories-table");if(!(a!=null&&a.length)){e.innerHTML='<div class="empty-state"><p>Sin categorías.</p></div>';return}e.innerHTML=`<div class="table-container"><table>
        <thead><tr><th>Nombre</th><th>Slug</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>${a.map(t=>`<tr>
          <td><strong>${l(t.name)}</strong></td>
          <td>${l(t.slug)}</td>
          <td><span class="badge ${t.is_active?"badge-success":"badge-danger"}">${t.is_active?"Activa":"Inactiva"}</span></td>
          <td style="display:flex;gap:0.5rem">
            <button class="btn btn-sm btn-outline edit-cat" data-id="${t.id}" data-name="${t.name}" data-slug="${t.slug}" data-desc="${t.description||""}">Editar</button>
            <button class="btn btn-sm ${t.is_active?"btn-secondary":"btn-primary"} toggle-cat" data-id="${t.id}" data-active="${t.is_active}">${t.is_active?"Desactivar":"Activar"}</button>
          </td>
        </tr>`).join("")}</tbody>
      </table></div>`,e.querySelectorAll(".toggle-cat").forEach(t=>t.addEventListener("click",async()=>{const n=t.dataset.id,r=t.dataset.active==="true";await o.from("categories").update({is_active:!r}).eq("id",n),c(r?"Categoría desactivada.":"Categoría activada."),d()})),e.querySelectorAll(".edit-cat").forEach(t=>t.addEventListener("click",()=>{const n=prompt("Nombre:",t.dataset.name);if(!n)return;const r=prompt("Slug:",t.dataset.slug);if(!r)return;const m=prompt("Descripción:",t.dataset.desc)||"";o.from("categories").update({name:n.trim(),slug:r.trim(),description:m}).eq("id",t.dataset.id).then(()=>{c("Categoría actualizada."),d()})}))}document.getElementById("add-cat-btn").addEventListener("click",async()=>{const a=prompt("Nombre de la categoría:");if(!a)return;const i=prompt("Slug (ej: electronica):");if(!i)return;const e=prompt("Descripción (opcional):")||"",{error:t}=await o.from("categories").insert({name:a.trim(),slug:i.trim(),description:e,is_active:!0});if(t){p(t.message);return}c("Categoría creada."),d()});async function h(){await u(),await v(),d()}h();
