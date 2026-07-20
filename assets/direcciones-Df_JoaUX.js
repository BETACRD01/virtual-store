import"./auth.service-BFJLC_vC.js";import{l as f,a as u}from"./footer-DFv10KXw.js";import{l as v}from"./account-sidebar-nHsYgJuz.js";import{p as a}from"./profile.service-DkT0cVC1.js";import{r as g}from"./auth.guard-C0624mU-.js";import{s as r}from"./dom-Dz1M3mpB.js";import{a as d,s as y}from"./notifications-DBxoMB4P.js";async function b(){const o=await g();if(!o)return;await f(),u(),v("direcciones");const n=o.user.id;async function s(){const i=await a.getAddresses(n),t=document.getElementById("addresses-list");if(!i.length){t.innerHTML='<div class="empty-state"><div class="empty-state-icon">📍</div><div class="empty-state-title">Sin direcciones</div><p>Agrega una dirección para recibir tus pedidos.</p></div>';return}t.innerHTML=i.map(e=>`<div class="card" style="padding:var(--spacing-lg);margin-bottom:var(--spacing-md)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <strong>${r(e.recipient_name)}</strong> ${e.is_default?'<span class="badge badge-info">Predeterminada</span>':""}
              <p style="font-size:0.875rem;color:var(--color-gray-500);margin-top:0.25rem">
                ${r(e.address_line)}<br>
                ${r(e.city)}, ${r(e.province)}<br>
                ${e.phone?"Tel: "+r(e.phone):""}
                ${e.reference?"<br>Ref: "+r(e.reference):""}
              </p>
            </div>
            <div style="display:flex;gap:0.5rem">
              ${e.is_default?"":`<button class="btn btn-sm btn-outline set-default" data-id="${e.id}">Predeterminar</button>`}
              <button class="btn btn-sm btn-danger delete-address" data-id="${e.id}">Eliminar</button>
            </div>
          </div>
        </div>`).join(""),t.querySelectorAll(".set-default").forEach(e=>e.addEventListener("click",async()=>{await a.setDefaultAddress(n,e.dataset.id),d("Dirección predeterminada actualizada."),s()})),t.querySelectorAll(".delete-address").forEach(e=>e.addEventListener("click",async()=>{confirm("¿Eliminar esta dirección?")&&(await a.deleteAddress(e.dataset.id),d("Dirección eliminada."),s())}))}document.getElementById("add-address-btn").addEventListener("click",async()=>{const i=prompt("Nombre del destinatario:");if(!i)return;const t=prompt("Teléfono:"),e=prompt("Estado / Provincia:");if(!e)return;const c=prompt("Ciudad:");if(!c)return;const l=prompt("Dirección (calle, número, colonia):");if(!l)return;const p=prompt("Referencia (opcional):");try{await a.createAddress({user_id:n,recipient_name:i,phone:t||"",province:e,city:c,address_line:l,reference:p||"",is_default:!1}),d("Dirección agregada."),s()}catch(m){y(m.message)}}),s()}b();
