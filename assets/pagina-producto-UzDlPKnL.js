import{a as B}from"./auth.service-BxJS2Ta1.js";import{l as w,a as S,p as k,c as x}from"./footer-DkVHHXvB.js";import{p as m}from"./profile.service-B8eeLRhV.js";import{c as F,f as E}from"./currency-BUz-WTj3.js";import{s as n}from"./dom-Dz1M3mpB.js";import{s as u,a as p}from"./notifications-DBxoMB4P.js";const v="/virtual-store/",_=new URLSearchParams(window.location.search),I=_.get("id");I||(window.location.href=`${v}pagina/catalogo.html`);async function H(){var g,f;await w(),S();const d=document.getElementById("product-container");try{const t=await k.getProductById(I);if(!t||!t.is_active){d.innerHTML='<div class="empty-state" style="padding:4rem 0"><div class="empty-state-icon">📦</div><div class="empty-state-title">Producto no encontrado</div><a href="./catalogo.html" class="btn btn-primary">Ver catálogo</a></div>';return}const L=await k.getProductImages(t.id),c=[t.main_image_url,...L.map(a=>a.image_url)].filter(Boolean),q=F(t.price,t.offer_price),l=await B.getSession(),s=(g=l==null?void 0:l.user)==null?void 0:g.id;let r=!1;if(s&&(r=await m.isFavorite(s,t.id)),d.innerHTML=`
          <div class="breadcrumb" style="padding-top:1rem;font-size:0.875rem"><a href="${v}index.html">Inicio</a> / <a href="${v}pagina/catalogo.html">Catálogo</a> / ${n(t.name)}</div>
          <div class="product-detail">
            <div class="product-gallery">
              <img src="${c[0]||""}" alt="${n(t.name)}" class="product-gallery-main" id="main-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22450%22 fill=%22%23e2e8f0%22><rect width=%22600%22 height=%22450%22/></svg>'">
              ${c.length>1?`<div class="product-gallery-thumbs">${c.map((a,e)=>`<img src="${a}" class="product-gallery-thumb ${e===0?"active":""}" data-index="${e}" onerror="this.style.display='none'">`).join("")}</div>`:""}
            </div>
            <div class="product-info">
              <div class="product-info-category">${n(((f=t.category)==null?void 0:f.name)||"")}</div>
              <h1 class="product-info-name">${n(t.name)}</h1>
              <div class="product-info-price">
                <span class="product-info-current">${E(t.offer_price||t.price)}</span>
                ${t.offer_price?`<span class="product-info-old">${E(t.price)}</span><span class="badge badge-danger" style="margin-left:0.5rem">-${q}%</span>`:""}
              </div>
              <div class="product-info-stock">
                ${t.stock>0?`<span class="text-success">✓ ${t.stock} disponibles</span>`:'<span class="text-danger">✗ Agotado</span>'}
                ${t.stock>0&&t.stock<=t.minimum_stock?'<span style="display:block;font-size:0.875rem;color:var(--color-warning);margin-top:0.25rem">Últimas unidades</span>':""}
              </div>
              <div class="product-info-desc">${n(t.description)}</div>
              <div class="product-info-actions">
                ${t.stock>0?`
                  <div class="quantity-selector">
                    <button id="qty-minus" aria-label="Disminuir cantidad">−</button>
                    <input type="number" id="qty-input" value="1" min="1" max="${t.stock}" readonly aria-label="Cantidad">
                    <button id="qty-plus" aria-label="Aumentar cantidad">+</button>
                  </div>
                  <button class="btn btn-primary btn-lg" id="add-to-cart">🛒 Agregar al carrito</button>
                `:""}
                ${s?`<button class="btn btn-outline ${r?"btn-danger":""}" id="fav-btn">${r?"♥":"♡"} Favorito</button>`:""}
              </div>
              <p style="margin-top:1rem;font-size:0.875rem;color:var(--color-gray-500)">SKU: ${n(t.sku)}</p>
            </div>
          </div>
        `,c.length>1){const a=document.getElementById("main-image");document.querySelectorAll(".product-gallery-thumb").forEach(e=>{e.addEventListener("click",()=>{var $;($=document.querySelector(".product-gallery-thumb.active"))==null||$.classList.remove("active"),e.classList.add("active"),a.src=e.src})})}const i=document.getElementById("qty-input"),y=document.getElementById("qty-minus"),b=document.getElementById("qty-plus");y&&y.addEventListener("click",()=>{Number(i.value)>1&&(i.value=Number(i.value)-1)}),b&&b.addEventListener("click",()=>{Number(i.value)<t.stock&&(i.value=Number(i.value)+1)});const h=document.getElementById("add-to-cart");h&&h.addEventListener("click",async()=>{const a=Number(i.value);if(a>t.stock){u("Stock insuficiente.");return}try{await x.addItem(s,t.id,a),p("Producto agregado al carrito."),await w()}catch(e){u(e.message)}});const o=document.getElementById("fav-btn");o&&o.addEventListener("click",async()=>{try{r?(await m.removeFavorite(s,t.id),p("Eliminado de favoritos."),r=!1,o.classList.remove("btn-danger"),o.innerHTML="♡ Favorito"):(await m.addFavorite(s,t.id),p("Añadido a favoritos."),r=!0,o.classList.add("btn-danger"),o.innerHTML="♥ Favorito")}catch(a){u(a.message)}})}catch(t){d.innerHTML=`<div class="empty-state" style="padding:4rem 0"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Error</div><p>${t.message}</p></div>`}}H();
