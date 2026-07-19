import"./auth.service-DSnWIW-s.js";import{l,a as p}from"./footer-BThdxhqe.js";import{l as m}from"./account-sidebar-BUKgOeim.js";import{p as o}from"./profile.service-CvJ-uAKC.js";import{a as u}from"./auth.guard-Dz1pRDbL.js";import{c as v,f as c}from"./currency-BUz-WTj3.js";import{s as d}from"./dom-Dz1M3mpB.js";import{a as f,s as g}from"./notifications-DBxoMB4P.js";const h="/virtual-store/";async function n(){const s=await u();if(s){await l(),p(),m("favoritos");try{const r=await o.getFavorites(s.user.id),i=document.getElementById("favorites-list");if(!r.length){i.innerHTML='<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">♥</div><div class="empty-state-title">Sin favoritos</div><p>Explora productos y agrega tus favoritos.</p><a href="../pagina/catalogo.html" class="btn btn-primary" style="margin-top:1rem">Ver productos</a></div>';return}i.innerHTML=r.map(t=>{const a=t.product;if(!a)return"";const e=v(a.price,a.offer_price);return`<div class="product-card">
            <a href="${h}pagina/producto.html?id=${a.id}">
              <img src="${a.main_image_url||""}" alt="${d(a.name)}" class="product-card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 fill=%22%23e2e8f0%22><rect width=%22300%22 height=%22300%22/></svg>'">
              <div class="product-card-body">
                <div class="product-card-name">${d(a.name)}</div>
                <div class="product-card-price">
                  <span class="product-card-current">${c(a.offer_price||a.price)}</span>
                  ${a.offer_price?`<span class="product-card-old">${c(a.price)}</span>`:""}
                  ${e>0?`<span class="product-card-discount">-${e}%</span>`:""}
                </div>
              </div>
            </a>
            <div style="padding:0 1rem 1rem">
              <button class="btn btn-sm btn-danger btn-block remove-fav" data-id="${a.id}">Eliminar</button>
            </div>
          </div>`}).join(""),i.querySelectorAll(".remove-fav").forEach(t=>t.addEventListener("click",async()=>{await o.removeFavorite(s.user.id,t.dataset.id),f("Eliminado de favoritos."),n()}))}catch(r){g(r.message)}}}n();
