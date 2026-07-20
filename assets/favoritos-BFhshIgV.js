import"./auth.service-COov5E7B.js";import{l,a as p}from"./footer-BeBew-19.js";import{l as m}from"./account-sidebar-DkGPZTeK.js";import{p as o}from"./profile.service-Dq0ylONH.js";import{r as u}from"./auth.guard-D5pPCsXW.js";import{c as v,f as c}from"./currency-BUz-WTj3.js";import{s as d}from"./dom-Dz1M3mpB.js";import{a as f,s as g}from"./notifications-DBxoMB4P.js";const h="/virtual-store/";async function n(){const s=await u();if(s){await l(),p(),m("favoritos");try{const a=await o.getFavorites(s.user.id),i=document.getElementById("favorites-list");if(!a.length){i.innerHTML='<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">♥</div><div class="empty-state-title">Sin favoritos</div><p>Explora productos y agrega tus favoritos.</p><a href="../pagina/catalogo.html" class="btn btn-primary" style="margin-top:1rem">Ver productos</a></div>';return}i.innerHTML=a.map(t=>{const r=t.product;if(!r)return"";const e=v(r.price,r.offer_price);return`<div class="product-card">
            <a href="${h}pagina/producto.html?id=${r.id}">
              <img src="${r.main_image_url||""}" alt="${d(r.name)}" class="product-card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%23e2e8f0%22><rect width=%22300%22 height=%22300%22/></svg>'">
              <div class="product-card-body">
                <div class="product-card-name">${d(r.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${c(r.offer_price||r.price)}</span>
                  ${r.offer_price?`<span class="product-card-old">${c(r.price)}</span>`:""}
                  ${e>0?`<span class="product-card-discount">-${e}%</span>`:""}
                </div>
              </div>
            </a>
            <div style="padding:0 1rem 1rem">
              <button class="btn btn-sm btn-danger btn-block remove-fav" data-id="${r.id}">Eliminar</button>
            </div>
          </div>`}).join(""),i.querySelectorAll(".remove-fav").forEach(t=>t.addEventListener("click",async()=>{await o.removeFavorite(s.user.id,t.dataset.id),f("Eliminado de favoritos."),n()}))}catch(a){g(a.message)}}}n();
