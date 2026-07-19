import"./auth.service-BfASCOUI.js";import{l as r,a as n}from"./footer-BXBpEo4g.js";import{l as i}from"./account-sidebar-DHbQ-DrP.js";import{o}from"./orders.service-n9J3N90b.js";import{r as l}from"./auth.guard-B_y850aO.js";import{f as d}from"./currency-BUz-WTj3.js";import{s as c}from"./notifications-DBxoMB4P.js";const p="/virtual-store/",m={pending:{label:"Pendiente",class:"badge-warning"},confirmed:{label:"Confirmado",class:"badge-info"},preparing:{label:"Preparando",class:"badge-info"},shipped:{label:"Enviado",class:"badge-info"},delivered:{label:"Entregado",class:"badge-success"},cancelled:{label:"Cancelado",class:"badge-danger"}};async function g(){if(await l()){await r(),n(),i("pedidos");try{const a=await o.getMyOrders(),s=document.getElementById("orders-list");if(!a.length){s.innerHTML='<div class="empty-state"><div class="empty-state-icon">📦</div><div class="empty-state-title">Sin pedidos</div><p>Aún no has realizado ninguna compra.</p><a href="../catalogo.html" class="btn btn-primary" style="margin-top:1rem">Ver productos</a></div>';return}s.innerHTML=a.map(e=>{const t=m[e.status]||{label:e.status,class:"badge-info"};return`<a href="${p}cuenta/detalle-pedido.html?id=${e.id}" class="card" style="display:block;padding:var(--spacing-lg);margin-bottom:var(--spacing-md);text-decoration:none;color:inherit">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
              <div>
                <strong>${e.order_number}</strong>
                <span style="font-size:0.875rem;color:var(--color-gray-500);margin-left:0.5rem">${new Date(e.created_at).toLocaleDateString("es-MX")}</span>
              </div>
              <div style="display:flex;align-items:center;gap:0.75rem">
                <span style="font-weight:700">${d(e.total)}</span>
                <span class="badge ${t.class}">${t.label}</span>
              </div>
            </div>
          </a>`}).join("")}catch(a){c(a.message)}}}g();
