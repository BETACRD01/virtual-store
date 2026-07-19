import{a as E}from"./auth.service-DSnWIW-s.js";import{l as p,a as q,c as d}from"./footer-BThdxhqe.js";import{f as i}from"./currency-BUz-WTj3.js";import{s as h}from"./dom-Dz1M3mpB.js";import"./notifications-DBxoMB4P.js";const f="/virtual-store/";async function _(){var u;await p(),q();const l=await E.getSession(),n=(u=l==null?void 0:l.user)==null?void 0:u.id;async function s(){var g,b;const o=await d.getCart(n),y=document.getElementById("cart-items"),v=document.getElementById("cart-summary");if(!o.length){y.innerHTML='<div class="empty-state"><div class="empty-state-icon">🛒</div><div class="empty-state-title">Tu carrito está vacío</div><p>Explora nuestros productos y agrega lo que te guste.</p><a href="./catalogo.html" class="btn btn-primary" style="margin-top:1rem">Ver catálogo</a></div>',v.innerHTML="";return}y.innerHTML=o.map(t=>{const a=t.product||{},e=t.unit_price||a.offer_price||a.price||0;return`<div class="card cart-item">
            <img src="${a.main_image_url||""}" alt="${h(a.name)}" class="cart-item-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 fill=%22%23e2e8f0%22><rect width=%22100%22 height=%22100%22/></svg>'">
            <div>
              <div class="cart-item-name"><a href="${f}pagina/producto.html?id=${a.id}">${h(a.name||"Producto")}</a></div>
              <div class="cart-item-price">${i(e)} c/u</div>
              <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem">
                <div class="quantity-selector" style="height:32px">
                  <button class="qty-btn" data-id="${t.product_id}" data-action="minus" style="width:32px;height:32px;font-size:1rem">−</button>
                  <input type="text" value="${t.quantity}" style="width:40px;height:32px;text-align:center;border:none;border-left:2px solid var(--color-gray-200);border-right:2px solid var(--color-gray-200);font-weight:600;font-size:0.875rem" readonly>
                  <button class="qty-btn" data-id="${t.product_id}" data-action="plus" style="width:32px;height:32px;font-size:1rem">+</button>
                </div>
                <button class="btn btn-sm btn-danger remove-btn" data-id="${t.product_id}" style="margin-left:0.5rem">Eliminar</button>
              </div>
            </div>
            <div class="cart-item-actions">
              <div class="cart-item-subtotal">${i(e*t.quantity)}</div>
            </div>
          </div>`}).join("");const m=o.reduce((t,a)=>{var e,r;return t+(a.quantity||1)*(a.unit_price||((e=a.product)==null?void 0:e.offer_price)||((r=a.product)==null?void 0:r.price)||0)},0),c=m>999?0:99,w=m+c;v.innerHTML=`<div class="card cart-summary">
          <h3 style="margin-bottom:1rem">Resumen</h3>
          <div class="cart-summary-row"><span>Subtotal</span><span>${i(m)}</span></div>
          <div class="cart-summary-row"><span>Envío</span><span>${c===0?"Gratis":i(c)}</span></div>
          ${c>0?'<p style="font-size:0.75rem;color:var(--color-gray-500);margin-top:0.25rem">Envío gratis en compras mayores a $999</p>':""}
          <div class="cart-summary-row cart-summary-total"><span>Total</span><span>${i(w)}</span></div>
          <button class="btn btn-primary btn-block btn-lg" id="checkout-btn" style="margin-top:1rem">Proceder al pago</button>
          <button class="btn btn-secondary btn-block" id="clear-cart-btn" style="margin-top:0.5rem">Vaciar carrito</button>
        </div>`,(g=document.getElementById("checkout-btn"))==null||g.addEventListener("click",()=>{window.location.href=`${f}pagina/checkout.html`}),(b=document.getElementById("clear-cart-btn"))==null||b.addEventListener("click",async()=>{await d.clearCart(n),s(),await p()}),document.querySelectorAll(".qty-btn").forEach(t=>{t.addEventListener("click",async()=>{const a=t.dataset.id,e=t.dataset.action,r=o.find(x=>x.product_id===a);if(!r)return;const $=e==="plus"?(r.quantity||1)+1:(r.quantity||1)-1;await d.updateQuantity(n,a,$),s()})}),document.querySelectorAll(".remove-btn").forEach(t=>{t.addEventListener("click",async()=>{await d.removeItem(n,t.dataset.id),s(),await p()})})}s()}_();
