const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/auth.service-COov5E7B.js","assets/auth-BpzVQfvl.css"])))=>i.map(i=>d[i]);
import{s as m}from"./auth.service-COov5E7B.js";import{r as E,_ as L}from"./admin.guard-RYhFZxhD.js";import{f as p}from"./currency-BUz-WTj3.js";import{s as a}from"./dom-Dz1M3mpB.js";import{s as w,a as x}from"./notifications-DBxoMB4P.js";const r="/virtual-store/",I=new URLSearchParams(window.location.search),o=I.get("id"),g=["pending","confirmed","preparing","shipped","delivered"],i={pending:"Pendiente",confirmed:"Confirmado",preparing:"Preparando",shipped:"Enviado",delivered:"Entregado",cancelled:"Cancelado"};async function P(){var n;const e=document.getElementById("admin-sidebar");e.innerHTML=`<div class="admin-sidebar">
        <div class="admin-sidebar-logo">⚙️ NovaStore</div>
        <div class="admin-sidebar-section">Menú</div>
        <a href="${r}admin/">📊 Dashboard</a>
        <a href="${r}admin/productos.html">📦 Productos</a>
        <a href="${r}admin/categorias.html">📂 Categorías</a>
        <a href="${r}admin/pedidos.html" class="active">📋 Pedidos</a>
        <a href="${r}admin/clientes.html">👥 Clientes</a>
        <div class="admin-sidebar-section">General</div>
        <a href="${r}index.html">← Ver tienda</a>
        <a href="#" id="logout-btn">🚪 Cerrar sesión</a>
      </div>`,(n=document.getElementById("logout-btn"))==null||n.addEventListener("click",async l=>{l.preventDefault();const{authService:d}=await L(async()=>{const{authService:s}=await import("./auth.service-COov5E7B.js").then(c=>c.b);return{authService:s}},__vite__mapDeps([0,1]));await d.signOut(),window.location.href=`${r}index.html`})}async function C(){var u,v,f,y,b,h;if(await E(),await P(),!o){document.getElementById("order-detail").innerHTML="<p>Pedido no encontrado.</p>";return}const{data:e,error:n}=await m.from("orders").select("*, order_items(*), address:addresses(*), order_status_history(*), profile:user_id(full_name, email, phone)").eq("id",o).single();if(n){document.getElementById("order-detail").innerHTML=`<p>Error: ${n.message}</p>`;return}const l=t=>t==="delivered"?"badge-success":t==="cancelled"?"badge-danger":"badge-warning",d=g.indexOf(e.status),s=d>=0&&d<g.length-1?g[d+1]:null,c=document.getElementById("order-detail");c.innerHTML=`
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:1.5rem">
          <div>
            <h1 style="font-size:var(--font-size-2xl);font-weight:700">Pedido ${e.order_number}</h1>
            <p style="color:var(--color-gray-500)">${new Date(e.created_at).toLocaleString("es-MX")}</p>
          </div>
          <div style="display:flex;gap:0.5rem;align-items:center">
            <span class="badge ${l(e.status)}" style="font-size:1rem">${i[e.status]||e.status}</span>
            ${s?`<button class="btn btn-primary btn-sm" id="next-status-btn">Avanzar a ${i[s]}</button>`:""}
            ${(e.status==="pending"||e.status==="confirmed")&&e.status!=="cancelled"?'<button class="btn btn-danger btn-sm" id="cancel-order-btn">Cancelar</button>':""}
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem">
          <div class="card" style="padding:var(--spacing-lg)">
            <h3>Cliente</h3>
            <p><strong>${a(((u=e.profile)==null?void 0:u.full_name)||"")}</strong><br>${a(((v=e.profile)==null?void 0:v.email)||"")}<br>${((f=e.profile)==null?void 0:f.phone)||""}</p>
          </div>
          ${e.address?`<div class="card" style="padding:var(--spacing-lg)">
            <h3>Dirección</h3>
            <p><strong>${a(e.address.recipient_name)}</strong><br>${a(e.address.address_line)}<br>${a(e.address.city)}, ${a(e.address.province)}<br>${e.address.phone||""}</p>
          </div>`:""}
        </div>

        <div class="card" style="padding:var(--spacing-lg);margin-bottom:1.5rem">
          <h3 style="margin-bottom:1rem">Productos</h3>
          ${e.order_items.map(t=>`<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--color-gray-100)">
            <div><strong>${a(t.product_name)}</strong> <span style="color:var(--color-gray-500)">x${t.quantity}</span></div>
            <div style="text-align:right"><strong>${p(t.subtotal)}</strong><br><span style="font-size:0.875rem;color:var(--color-gray-500)">${p(t.unit_price)} c/u</span></div>
          </div>`).join("")}
          <div style="display:flex;justify-content:space-between;padding:0.5rem 0;margin-top:0.5rem;border-top:2px solid var(--color-gray-200);font-weight:700;font-size:1.125rem">
            <span>Total</span><span>${p(e.total)}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Notas del administrador</label>
          <textarea class="form-textarea" id="admin-notes" style="min-height:60px">${a(e.admin_notes||"")}</textarea>
        </div>

        ${(y=e.order_status_history)!=null&&y.length?`<div class="card" style="padding:var(--spacing-lg)">
          <h3>Historial</h3>
          ${e.order_status_history.map(t=>`<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--color-gray-100);font-size:0.875rem">
            <span>${i[t.previous_status]||t.previous_status||"—"} → ${i[t.new_status]||t.new_status}</span>
            <span style="color:var(--color-gray-500)">${new Date(t.created_at).toLocaleString("es-MX")}</span>
          </div>`).join("")}
        </div>`:""}
      `,(b=document.getElementById("next-status-btn"))==null||b.addEventListener("click",async()=>{var $;const t=(($=document.getElementById("admin-notes"))==null?void 0:$.value)||"",{error:_}=await m.rpc("update_order_status",{p_order_id:o,p_new_status:s,p_notes:t});if(_){w(_.message);return}x(`Estado actualizado a ${i[s]}.`),window.location.reload()}),(h=document.getElementById("cancel-order-btn"))==null||h.addEventListener("click",async()=>{if(!confirm("¿Cancelar este pedido?"))return;const{error:t}=await m.rpc("cancel_order",{p_order_id:o});if(t){w(t.message);return}x("Pedido cancelado."),window.location.reload()})}C();
