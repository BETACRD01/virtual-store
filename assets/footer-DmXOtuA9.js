import{s as c,g as u,a as q}from"./auth.service-C3JQ1Rkv.js";const _="virtual_store_cart";function g(){try{return JSON.parse(localStorage.getItem(_)||"[]")}catch{return[]}}function v(t){localStorage.setItem(_,JSON.stringify(t))}function $(){localStorage.removeItem(_)}const E={async getCart(t){if(!t)return g();const{data:e}=await c.from("carts").select("id").eq("user_id",t).maybeSingle();if(!e)return[];const{data:a}=await c.from("cart_items").select("*, product:products(*)").eq("cart_id",e.id);return a||[]},async addItem(t,e,a=1){const{data:r}=await c.from("products").select("*").eq("id",e).single();if(!r||!r.is_active)throw new Error("Producto no disponible.");if(r.stock<a)throw new Error("Stock insuficiente.");if(!t){const s=g(),i=s.find(l=>l.product_id===e);return i?i.quantity=Math.min(i.quantity+a,r.stock):s.push({product_id:e,quantity:a,unit_price:r.offer_price||r.price,product:r}),v(s),s}let{data:o}=await c.from("carts").select("id").eq("user_id",t).maybeSingle();if(!o){const{data:s}=await c.from("carts").insert({user_id:t}).select().single();o=s}const{data:n}=await c.from("cart_items").select("*").eq("cart_id",o.id).eq("product_id",e).maybeSingle();if(n){const s=Math.min(n.quantity+a,r.stock);await c.from("cart_items").update({quantity:s,unit_price:r.offer_price||r.price}).eq("id",n.id)}else await c.from("cart_items").insert({cart_id:o.id,product_id:e,quantity:a,unit_price:r.offer_price||r.price});return this.getCart(t)},async updateQuantity(t,e,a){if(a<1)return this.removeItem(t,e);if(!t){const o=g(),n=o.find(s=>s.product_id===e);return n&&(n.quantity=a),v(o),o}const{data:r}=await c.from("carts").select("id").eq("user_id",t).single();return await c.from("cart_items").update({quantity:a}).eq("cart_id",r.id).eq("product_id",e),this.getCart(t)},async removeItem(t,e){if(!t){const r=g().filter(o=>o.product_id!==e);return v(r),r}const{data:a}=await c.from("carts").select("id").eq("user_id",t).single();return await c.from("cart_items").delete().eq("cart_id",a.id).eq("product_id",e),this.getCart(t)},async clearCart(t){if(!t)return $(),[];const{data:e}=await c.from("carts").select("id").eq("user_id",t).single();return e&&await c.from("cart_items").delete().eq("cart_id",e.id),[]},async syncLocalCart(t){const e=g();if(!e.length)return this.getCart(t);for(const a of e)try{await this.addItem(t,a.product_id,a.quantity)}catch{}return $(),this.getCart(t)}},C={async getProducts({categoryId:t,search:e,featured:a,offers:r,sort:o,page:n=1,limit:s=12}={}){let i=c.from("products").select("*, category:categories(name, slug)",{count:"exact"}).eq("is_active",!0);t&&(i=i.eq("category_id",t)),e&&(i=i.ilike("name",`%${e}%`)),a&&(i=i.eq("is_featured",!0)),r&&(i=i.not("offer_price","is",null).not("offer_price","eq",0)),o==="price_asc"?i=i.order("price",{ascending:!0}):o==="price_desc"?i=i.order("price",{ascending:!1}):o==="name_asc"?i=i.order("name",{ascending:!0}):o==="name_desc"?i=i.order("name",{ascending:!1}):i=i.order("created_at",{ascending:!1});const l=(n-1)*s,{data:f,error:m,count:h}=await i.range(l,l+s-1);if(m)throw new Error(u(m));return{products:f||[],count:h||0}},async getProductBySlug(t){const{data:e,error:a}=await c.from("products").select("*, category:categories(name, slug)").eq("slug",t).eq("is_active",!0).single();if(a)throw new Error(u(a));return e},async getProductById(t){const{data:e,error:a}=await c.from("products").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw new Error(u(a));return e},async getProductImages(t){const{data:e,error:a}=await c.from("product_images").select("*").eq("product_id",t).order("display_order");if(a)throw new Error(u(a));return e||[]},async getActiveCategories(){const{data:t,error:e}=await c.from("categories").select("*").eq("is_active",!0).order("name");if(e)throw new Error(u(e));return t||[]},async getFeaturedProducts(t=8){const{data:e,error:a}=await c.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).eq("is_featured",!0).limit(t);if(a)throw new Error(u(a));return e||[]},async getOfferProducts(t=8){const{data:e,error:a}=await c.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).not("offer_price","is",null).not("offer_price","eq",0).limit(t);if(a)throw new Error(u(a));return e||[]}};async function L(){var w,y;const t=document.getElementById("main-header");if(!t)return;const e="/virtual-store/",a=await q.getSession(),r=a==null?void 0:a.user,o=r?await q.getProfile(r.id):null,n=(o==null?void 0:o.role)||"customer";let s=0;try{s=(await E.getCart(r==null?void 0:r.id)).reduce((d,b)=>d+(b.quantity||1),0)}catch{}const i=r?`<a href="${e}cuenta/perfil.html" title="Mi cuenta" aria-label="Mi cuenta">${((y=(w=o==null?void 0:o.full_name)==null?void 0:w[0])==null?void 0:y.toUpperCase())||"👤"}</a>`:`<a href="${e}auth/login.html" class="btn btn-primary btn-sm">Iniciar sesión</a>`;let l="";try{l=(await C.getActiveCategories()).slice(0,6).map(d=>`<a href="${e}pagina/catalogo.html?categoria=${d.id}" data-category-id="${d.id}">${d.name}</a>`).join("")}catch{}t.innerHTML=`
    <div class="header">
      <div class="container">
        <div class="header-inner">
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menú">☰</button>
          <a href="${e}index.html" class="header-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#2563eb"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/></svg>
            NovaStore
          </a>
          <div class="header-search">
            <span class="header-search-icon">🔍</span>
            <input type="text" id="global-search" placeholder="Buscar productos..." aria-label="Buscar productos">
          </div>
          <div class="header-actions">
            ${n==="admin"?`<a href="${e}admin/" title="Panel admin">⚙️</a>`:""}
            ${i}
            <a href="${e}pagina/carrito.html" title="Carrito" aria-label="Carrito de compras">
              🛒
              ${s>0?`<span class="cart-count" id="cart-count">${s>99?"99+":s}</span>`:""}
            </a>
          </div>
        </div>
      </div>
    </div>
    <nav class="nav" id="main-nav">
      <div class="container">
        <div class="nav-list">
          <a href="${e}index.html">Inicio</a>
          <a href="${e}pagina/catalogo.html">Todos los productos</a>
          ${l}
        </div>
      </div>
    </nav>
  `;const f=document.getElementById("global-search");if(f){let p;f.addEventListener("input",()=>{clearTimeout(p),p=setTimeout(()=>{const d=f.value.trim();window.location.href=`${e}pagina/catalogo.html${d?`?busqueda=${encodeURIComponent(d)}`:""}`},500)})}const m=document.getElementById("mobile-menu-btn"),h=document.getElementById("main-nav");m&&h&&m.addEventListener("click",()=>h.classList.toggle("open"))}function M(){const t=document.getElementById("main-footer");if(!t)return;const e="/virtual-store/";t.innerHTML=`
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>NovaStore</h3>
            <p style="font-size:0.875rem;line-height:1.6">Tu tienda de confianza con los mejores productos y los mejores precios.</p>
          </div>
          <div>
            <h3>Tienda</h3>
            <a href="${e}index.html">Inicio</a>
            <a href="${e}pagina/catalogo.html">Catálogo</a>
            <a href="${e}pagina/catalogo.html?ofertas=true">Ofertas</a>
          </div>
          <div>
            <h3>Mi cuenta</h3>
            <a href="${e}auth/login.html">Iniciar sesión</a>
            <a href="${e}auth/registro.html">Registrarse</a>
            <a href="${e}cuenta/pedidos.html">Mis pedidos</a>
          </div>
          <div>
            <h3>Contacto</h3>
            <p style="font-size:0.875rem">contacto@novastore.com</p>
            <p style="font-size:0.875rem">+52 55 1234 5678</p>
            <p style="font-size:0.875rem">Lun - Vie: 9:00 - 18:00</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} NovaStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `}export{M as a,E as c,L as l,C as p};
