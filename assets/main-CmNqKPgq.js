import"./auth.service-BfASCOUI.js";import{l as u,a as p,p as n}from"./footer-BXBpEo4g.js";import{c as l,f as s}from"./currency-BUz-WTj3.js";import{s as a}from"./dom-Dz1M3mpB.js";async function m(){await u(),p();const d="/virtual-store/",o=document.getElementById("featured-products"),i=document.getElementById("offer-products");try{const e=await n.getFeaturedProducts(4);o.innerHTML=e.map(r=>{var c;const t=l(r.price,r.offer_price);return`
            <a href="${d}producto.html?id=${r.id}" class="product-card">
              <img src="${r.main_image_url||""}" alt="${a(r.name)}" class="product-card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%23e2e8f0%22><rect width=%22300%22 height=%22300%22/></svg>'">
              <div class="product-card-body">
                <div class="product-card-category">${a(((c=r.category)==null?void 0:c.name)||"")}</div>
                <div class="product-card-name">${a(r.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${s(r.offer_price||r.price)}</span>
                  ${r.offer_price?`<span class="product-card-old">${s(r.price)}</span>`:""}
                  ${t>0?`<span class="product-card-discount">-${t}%</span>`:""}
                </div>
              </div>
            </a>
          `}).join("")}catch{o.innerHTML='<div class="empty-state"><p>Error al cargar productos.</p></div>'}try{const e=await n.getOfferProducts(4);i.innerHTML=e.map(r=>{var c;const t=l(r.price,r.offer_price);return`
            <a href="${d}producto.html?id=${r.id}" class="product-card">
              <img src="${r.main_image_url||""}" alt="${a(r.name)}" class="product-card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%23e2e8f0%22><rect width=%22300%22 height=%22300%22/></svg>'">
              <div class="product-card-body">
                <div class="product-card-category">${a(((c=r.category)==null?void 0:c.name)||"")}</div>
                <div class="product-card-name">${a(r.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${s(r.offer_price||r.price)}</span>
                  <span class="product-card-old">${s(r.price)}</span>
                  <span class="product-card-discount">-${t}%</span>
                </div>
              </div>
            </a>
          `}).join("")}catch{i.innerHTML='<div class="empty-state"><p>Error al cargar ofertas.</p></div>'}}m();
