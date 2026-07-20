import"./auth.service-BFJLC_vC.js";import{l,a as u,p as n}from"./footer-DFv10KXw.js";import{c as p,f as e}from"./currency-BUz-WTj3.js";import{s as a}from"./dom-Dz1M3mpB.js";async function m(){await l(),u();const s="/virtual-store/",o=document.getElementById("featured-products"),i=document.getElementById("offer-products");try{const t=await n.getFeaturedProducts(4);o.innerHTML=t.map(r=>{var c;const d=p(r.price,r.offer_price);return`
            <a href="${s}pagina/producto.html?id=${r.id}" class="product-card">
              <div class="product-card-image-wrapper">
                <img src="${r.main_image_url||""}" alt="${a(r.name)}" class="product-card-image" loading="lazy" onerror="this.parentElement.innerHTML='<div class=product-card-image-placeholder>📦</div>'">
                ${d>0?`<span class="product-card-badge">-${d}%</span>`:""}
              </div>
              <div class="product-card-body">
                <div class="product-card-category">${a(((c=r.category)==null?void 0:c.name)||"")}</div>
                <div class="product-card-name">${a(r.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${e(r.offer_price||r.price)}</span>
                  ${r.offer_price?`<span class="product-card-old">${e(r.price)}</span>`:""}
                </div>
              </div>
            </a>
          `}).join("")}catch{o.innerHTML='<div class="empty-state"><p>Error al cargar productos.</p></div>'}try{const t=await n.getOfferProducts(4);i.innerHTML=t.map(r=>{var c;const d=p(r.price,r.offer_price);return`
            <a href="${s}pagina/producto.html?id=${r.id}" class="product-card">
              <div class="product-card-image-wrapper">
                <img src="${r.main_image_url||""}" alt="${a(r.name)}" class="product-card-image" loading="lazy" onerror="this.parentElement.innerHTML='<div class=product-card-image-placeholder>📦</div>'">
                <span class="product-card-badge">-${d}%</span>
              </div>
              <div class="product-card-body">
                <div class="product-card-category">${a(((c=r.category)==null?void 0:c.name)||"")}</div>
                <div class="product-card-name">${a(r.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${e(r.offer_price||r.price)}</span>
                  <span class="product-card-old">${e(r.price)}</span>
                </div>
              </div>
            </a>
          `}).join("")}catch{i.innerHTML='<div class="empty-state"><p>Error al cargar ofertas.</p></div>'}}m();
