import"./auth.service-BxJS2Ta1.js";import{l as g,a as m}from"./footer-DkVHHXvB.js";import{l as y}from"./account-sidebar-svF31pKR.js";import{o as l}from"./orders.service-Bt366Bu8.js";import{a as b}from"./auth.guard-D-oprmKr.js";import{f as t}from"./currency-BUz-WTj3.js";import{s}from"./dom-Dz1M3mpB.js";import{a as v,s as c}from"./notifications-DBxoMB4P.js";const u={pending:{label:"Pendiente",class:"badge-warning"},confirmed:{label:"Confirmado",class:"badge-info"},preparing:{label:"Preparando",class:"badge-info"},shipped:{label:"Enviado",class:"badge-info"},delivered:{label:"Entregado",class:"badge-success"},cancelled:{label:"Cancelado",class:"badge-danger"}};async function f(){var n;if(!await b())return;await g(),m(),y("pedidos");const r=new URLSearchParams(window.location.search).get("id");if(!r){document.getElementById("order-detail").innerHTML='<div class="empty-state"><p>Pedido no encontrado.</p></div>';return}try{const e=await l.getMyOrderById(r),o=u[e.status]||{label:e.status,class:"badge-info"},d={pending:{label:"Pendiente",class:"badge-warning"},paid:{label:"Pagado",class:"badge-success"},failed:{label:"Fallido",class:"badge-danger"},refunded:{label:"Reembolsado",class:"badge-info"}}[e.payment_status]||{label:e.payment_status,class:"badge-info"},p=document.getElementById("order-detail");p.innerHTML=`
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:var(--spacing-xl)">
              <div>
                <h1 style="font-size:var(--font-size-2xl);font-weight:700">Pedido ${e.order_number}</h1>
                <p style="color:var(--color-gray-500)">${new Date(e.created_at).toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
              </div>
              <div style="display:flex;gap:0.5rem">
                <span class="badge ${o.class}" style="font-size:0.875rem">${o.label}</span>
                <span class="badge ${d.class}" style="font-size:0.875rem">${d.label}</span>
              </div>
            </div>

            ${e.status==="pending"||e.status==="confirmed"?'<button class="btn btn-danger" id="cancel-order-btn">Cancelar pedido</button><br><br>':""}

            <div class="card" style="padding:var(--spacing-lg);margin-bottom:var(--spacing-lg)">
              <h3 style="margin-bottom:1rem">Productos</h3>
              ${e.order_items.map(a=>`<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--color-gray-100)">
                <div><strong>${s(a.product_name)}</strong><br><span style="font-size:0.875rem;color:var(--color-gray-500)">SKU: ${s(a.product_sku)} x${a.quantity}</span></div>
                <div style="text-align:right"><strong>${t(a.subtotal)}</strong><br><span style="font-size:0.875rem;color:var(--color-gray-500)">${t(a.unit_price)} c/u</span></div>
              </div>`).join("")}
            </div>

            ${e.address?`<div class="card" style="padding:var(--spacing-lg);margin-bottom:var(--spacing-lg)">
              <h3 style="margin-bottom:1rem">Dirección de entrega</h3>
              <p><strong>${s(e.address.recipient_name)}</strong><br>
              ${s(e.address.address_line)}<br>
              ${s(e.address.city)}, ${s(e.address.province)}<br>
              ${e.address.phone?"Tel: "+s(e.address.phone):""}
              ${e.address.reference?"<br>Ref: "+s(e.address.reference):""}</p>
            </div>`:""}

            <div class="card" style="padding:var(--spacing-lg);margin-bottom:var(--spacing-lg)">
              <h3 style="margin-bottom:1rem">Resumen</h3>
              <div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Subtotal</span><span>${t(e.subtotal)}</span></div>
              <div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Envío</span><span>${t(e.shipping_cost)}</span></div>
              ${e.discount>0?`<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Descuento</span><span>-${t(e.discount)}</span></div>`:""}
              <div style="display:flex;justify-content:space-between;padding:0.5rem 0 0;border-top:2px solid var(--color-gray-200);margin-top:0.5rem;font-weight:700;font-size:1.125rem">
                <span>Total</span><span style="color:var(--color-primary)">${t(e.total)}</span>
              </div>
            </div>

            ${e.customer_notes?`<div class="card" style="padding:var(--spacing-lg);margin-bottom:var(--spacing-lg)">
              <h3 style="margin-bottom:0.5rem">Notas</h3>
              <p style="color:var(--color-gray-600)">${s(e.customer_notes)}</p>
            </div>`:""}

            ${(n=e.order_status_history)!=null&&n.length?`<div class="card" style="padding:var(--spacing-lg)">
              <h3 style="margin-bottom:1rem">Historial de estados</h3>
              ${e.order_status_history.map(a=>`<div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--color-gray-100);font-size:0.875rem">
                <span>${a.previous_status||"—"} → ${a.new_status}</span>
                <span style="color:var(--color-gray-500)">${new Date(a.created_at).toLocaleString("es-MX")}</span>
              </div>`).join("")}
            </div>`:""}
          </div>
        `;const i=document.getElementById("cancel-order-btn");i&&i.addEventListener("click",async()=>{if(confirm("¿Cancelar este pedido?"))try{await l.cancelOrder(r),v("Pedido cancelado."),window.location.reload()}catch(a){c(a.message)}})}catch(e){c(e.message)}}f();
