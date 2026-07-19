import"./auth.service-BfASCOUI.js";import{l as k,a as S,c as T}from"./footer-BXBpEo4g.js";import{p as v}from"./profile.service-BKi9D-xX.js";import{o as j}from"./orders.service-n9J3N90b.js";import{f}from"./currency-BUz-WTj3.js";import{s,d as q,e as z}from"./dom-Dz1M3mpB.js";import{a as E,s as h}from"./notifications-DBxoMB4P.js";import{r as M}from"./auth.guard-B_y850aO.js";const _="/virtual-store/";let b=1,a=null,o="cash";async function C(){const y=await M();if(!y)return;await k(),S();const p=y.user.id,n=await T.getCart(p);if(!n.length){window.location.href=`${_}carrito.html`;return}async function i(){var $,w;const c=document.getElementById("checkout-form"),m=document.getElementById("checkout-summary"),d=await v.getAddresses(p),g=n.reduce((e,t)=>{var r,l;return e+(t.quantity||1)*(t.unit_price||((r=t.product)==null?void 0:r.offer_price)||((l=t.product)==null?void 0:l.price)||0)},0),u=g>999?0:99,A=g+u;if(m.innerHTML=`<div class="card" style="padding:1.5rem;position:sticky;top:100px">
          <h3 style="margin-bottom:1rem">Resumen</h3>
          ${n.slice(0,4).map(e=>{const t=e.product||{};return`<div style="display:flex;justify-content:space-between;font-size:0.875rem;padding:0.25rem 0;gap:0.5rem">
              <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s(t.name||"")} x${e.quantity}</span>
              <span style="font-weight:600">${f((e.unit_price||t.offer_price||t.price||0)*e.quantity)}</span>
            </div>`}).join("")}
          ${n.length>4?`<p style="font-size:0.75rem;color:var(--color-gray-500)">+${n.length-4} productos más</p>`:""}
          <hr style="margin:0.75rem 0;border-color:var(--color-gray-200)">
          <div style="display:flex;justify-content:space-between;font-size:0.875rem;padding:0.25rem 0"><span>Subtotal</span><span>${f(g)}</span></div>
          <div style="display:flex;justify-content:space-between;font-size:0.875rem;padding:0.25rem 0"><span>Envío</span><span>${u===0?"Gratis":f(u)}</span></div>
          <div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.125rem;border-top:2px solid var(--color-gray-200);padding-top:0.75rem;margin-top:0.5rem">
            <span>Total</span><span style="color:var(--color-primary)">${f(A)}</span>
          </div>
        </div>`,b===4){c.innerHTML=`<div class="order-success">
            <div class="order-success-icon">✅</div>
            <h2>¡Pedido confirmado!</h2>
            <p style="color:var(--color-gray-500);margin:0.5rem 0 1.5rem">Gracias por tu compra. Recibirás un correo con los detalles.</p>
            <a href="${_}cuenta/pedidos.html" class="btn btn-primary">Ver mis pedidos</a>
          </div>`;return}c.innerHTML=`
          <div class="checkout-step">
            <div class="checkout-step-title"><span class="checkout-step-number">1</span> Dirección de entrega</div>
            ${d.length?`<div id="address-list">${d.map(e=>`<label class="card" style="display:flex;align-items:flex-start;gap:1rem;padding:1rem;margin-bottom:0.5rem;cursor:pointer;${a===e.id?"border-color:var(--color-primary)":""}">
              <input type="radio" name="address" value="${e.id}" ${a===e.id?"checked":""} style="margin-top:0.25rem">
              <div><strong>${s(e.recipient_name)}</strong><br><span style="font-size:0.875rem;color:var(--color-gray-500)">${s(e.address_line)}, ${s(e.city)}, ${s(e.province)}${e.reference?"<br>"+s(e.reference):""}${e.phone?"<br>Tel: "+s(e.phone):""}</span></div>
            </label>`).join("")}</div>`:'<p style="color:var(--color-gray-500);margin-bottom:1rem">No tienes direcciones registradas.</p>'}
            <button class="btn btn-outline btn-sm" id="new-address-btn">+ Nueva dirección</button>
          </div>

          <div class="checkout-step">
            <div class="checkout-step-title"><span class="checkout-step-number">2</span> Método de pago</div>
            <label class="card" style="display:flex;align-items:center;gap:1rem;padding:1rem;margin-bottom:0.5rem;cursor:pointer;${o==="cash"?"border-color:var(--color-primary)":""}">
              <input type="radio" name="payment" value="cash" ${o==="cash"?"checked":""}> Pago contra entrega
            </label>
            <label class="card" style="display:flex;align-items:center;gap:1rem;padding:1rem;cursor:pointer;${o==="transfer"?"border-color:var(--color-primary)":""}">
              <input type="radio" name="payment" value="transfer" ${o==="transfer"?"checked":""}> Transferencia bancaria
            </label>
          </div>

          <div class="checkout-step">
            <div class="checkout-step-title"><span class="checkout-step-number">3</span> Notas (opcional)</div>
            <textarea class="form-textarea" id="customer-notes" placeholder="¿Alguna nota para tu pedido?" style="min-height:80px"></textarea>
          </div>

          <button class="btn btn-primary btn-lg btn-block" id="confirm-order-btn" ${a?"":"disabled"}>Confirmar pedido</button>
        `,document.querySelectorAll('input[name="address"]').forEach(e=>{e.addEventListener("change",()=>{a=e.value,i()})}),document.querySelectorAll('input[name="payment"]').forEach(e=>{e.addEventListener("change",()=>{o=e.value,i()})}),($=document.getElementById("new-address-btn"))==null||$.addEventListener("click",async()=>{var x;const e=prompt("Estado / Provincia:");if(!e)return;const t=prompt("Ciudad:");if(!t)return;const r=prompt("Dirección (calle, número, colonia):");if(!r)return;const l=prompt("Nombre del destinatario:",((x=y.user.user_metadata)==null?void 0:x.full_name)||"");if(!l)return;const B=prompt("Teléfono:"),I=prompt("Referencia (opcional):");try{await v.createAddress({user_id:p,recipient_name:l,phone:B||"",province:e,city:t,address_line:r,reference:I||"",is_default:!d.length}),E("Dirección registrada."),i()}catch(L){h(L.message)}}),(w=document.getElementById("confirm-order-btn"))==null||w.addEventListener("click",async()=>{var t;if(!a){h("Selecciona una dirección.");return}const e=document.getElementById("confirm-order-btn");q(e);try{await j.createOrder({address_id:a,payment_method:o==="cash"?"cash":"transfer",customer_notes:((t=document.getElementById("customer-notes"))==null?void 0:t.value)||"",shipping_cost:u}),b=4,i(),await k(),E("Pedido creado exitosamente.")}catch(r){h(r.message),z(e)}})}if(n.length){const c=await v.getAddresses(p),m=c.find(d=>d.is_default)||c[0];m&&(a=m.id)}i()}C();
