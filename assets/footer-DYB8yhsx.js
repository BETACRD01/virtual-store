import{s,g as u,a as w}from"./auth.service-DJHmt2aS.js";const y="virtual_store_cart";function p(){try{return JSON.parse(localStorage.getItem(y)||"[]")}catch{return[]}}function _(t){localStorage.setItem(y,JSON.stringify(t))}function S(){localStorage.removeItem(y)}const M={async getCart(t){if(!t)return p();const{data:e}=await s.from("carts").select("id").eq("user_id",t).maybeSingle();if(!e)return[];const{data:a}=await s.from("cart_items").select("*, product:products(*)").eq("cart_id",e.id);return a||[]},async addItem(t,e,a=1){const{data:r}=await s.from("products").select("*").eq("id",e).single();if(!r||!r.is_active)throw new Error("Producto no disponible.");if(r.stock<a)throw new Error("Stock insuficiente.");if(!t){const n=p(),o=n.find(m=>m.product_id===e);return o?o.quantity=Math.min(o.quantity+a,r.stock):n.push({product_id:e,quantity:a,unit_price:r.offer_price||r.price,product:r}),_(n),n}let{data:i}=await s.from("carts").select("id").eq("user_id",t).maybeSingle();if(!i){const{data:n}=await s.from("carts").insert({user_id:t}).select().single();i=n}const{data:d}=await s.from("cart_items").select("*").eq("cart_id",i.id).eq("product_id",e).maybeSingle();if(d){const n=Math.min(d.quantity+a,r.stock);await s.from("cart_items").update({quantity:n,unit_price:r.offer_price||r.price}).eq("id",d.id)}else await s.from("cart_items").insert({cart_id:i.id,product_id:e,quantity:a,unit_price:r.offer_price||r.price});return this.getCart(t)},async updateQuantity(t,e,a){if(a<1)return this.removeItem(t,e);if(!t){const i=p(),d=i.find(n=>n.product_id===e);return d&&(d.quantity=a),_(i),i}const{data:r}=await s.from("carts").select("id").eq("user_id",t).single();return await s.from("cart_items").update({quantity:a}).eq("cart_id",r.id).eq("product_id",e),this.getCart(t)},async removeItem(t,e){if(!t){const r=p().filter(i=>i.product_id!==e);return _(r),r}const{data:a}=await s.from("carts").select("id").eq("user_id",t).single();return await s.from("cart_items").delete().eq("cart_id",a.id).eq("product_id",e),this.getCart(t)},async clearCart(t){if(!t)return S(),[];const{data:e}=await s.from("carts").select("id").eq("user_id",t).single();return e&&await s.from("cart_items").delete().eq("cart_id",e.id),[]},async syncLocalCart(t){const e=p();if(!e.length)return this.getCart(t);for(const a of e)try{await this.addItem(t,a.product_id,a.quantity)}catch{}return S(),this.getCart(t)}},x={async getProducts({categoryId:t,search:e,featured:a,offers:r,sort:i,page:d=1,limit:n=12}={}){let o=s.from("products").select("*, category:categories(name, slug)",{count:"exact"}).eq("is_active",!0);t&&(o=o.eq("category_id",t)),e&&(o=o.ilike("name",`%${e}%`)),a&&(o=o.eq("is_featured",!0)),r&&(o=o.not("offer_price","is",null).not("offer_price","eq",0)),i==="price_asc"?o=o.order("price",{ascending:!0}):i==="price_desc"?o=o.order("price",{ascending:!1}):i==="name_asc"?o=o.order("name",{ascending:!0}):i==="name_desc"?o=o.order("name",{ascending:!1}):o=o.order("created_at",{ascending:!1});const m=(d-1)*n,{data:h,error:f,count:g}=await o.range(m,m+n-1);if(f)throw new Error(u(f));return{products:h||[],count:g||0}},async getProductBySlug(t){const{data:e,error:a}=await s.from("products").select("*, category:categories(name, slug)").eq("slug",t).eq("is_active",!0).single();if(a)throw new Error(u(a));return e},async getProductById(t){const{data:e,error:a}=await s.from("products").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw new Error(u(a));return e},async getProductImages(t){const{data:e,error:a}=await s.from("product_images").select("*").eq("product_id",t).order("display_order");if(a)throw new Error(u(a));return e||[]},async getActiveCategories(){const{data:t,error:e}=await s.from("categories").select("*").eq("is_active",!0).order("name");if(e)throw new Error(u(e));return t||[]},async getFeaturedProducts(t=8){const{data:e,error:a}=await s.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).eq("is_featured",!0).limit(t);if(a)throw new Error(u(a));return e||[]},async getOfferProducts(t=8){const{data:e,error:a}=await s.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).not("offer_price","is",null).not("offer_price","eq",0).limit(t);if(a)throw new Error(u(a));return e||[]}};async function k(){var C,L;const t=document.getElementById("main-header");if(!t)return;const e="/virtual-store/",a=await w.getSession(),r=a==null?void 0:a.user,i=r?await w.getProfile(r.id):null,d=(i==null?void 0:i.role)||"customer";let n=0;try{n=(await M.getCart(r==null?void 0:r.id)).reduce((l,B)=>l+(B.quantity||1),0)}catch{}const o=i!=null&&i.full_name?i.full_name.split(" ").map(c=>c[0]).join("").slice(0,2).toUpperCase():((L=(C=r==null?void 0:r.email)==null?void 0:C[0])==null?void 0:L.toUpperCase())||"?",m=r?`<div class="user-menu-wrapper">
        <button class="header-avatar" id="user-menu-btn" aria-label="Menú de usuario">${o}</button>
        <div class="user-dropdown" id="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-avatar">${o}</div>
            <div>
              <div class="user-dropdown-name">${(i==null?void 0:i.full_name)||"Usuario"}</div>
              <div class="user-dropdown-email">${r.email}</div>
            </div>
          </div>
          <div class="user-dropdown-divider"></div>
          <a href="${e}cuenta/perfil.html" class="user-dropdown-item">👤 Mi perfil</a>
          <a href="${e}cuenta/pedidos.html" class="user-dropdown-item">📦 Mis pedidos</a>
          <a href="${e}cuenta/direcciones.html" class="user-dropdown-item">📍 Direcciones</a>
          <a href="${e}cuenta/favoritos.html" class="user-dropdown-item">♥ Favoritos</a>
          ${d==="admin"?`<div class="user-dropdown-divider"></div><a href="${e}admin/" class="user-dropdown-item">⚙️ Panel admin</a>`:""}
          <div class="user-dropdown-divider"></div>
          <button class="user-dropdown-item" id="logout-btn">🚪 Cerrar sesión</button>
        </div>
      </div>`:`<a href="${e}auth/login.html" class="btn btn-primary btn-sm" style="padding:0.5rem 1.25rem;font-size:0.8rem">Iniciar sesión</a>`;let h="";try{h=(await x.getActiveCategories()).slice(0,6).map(l=>`<a href="${e}pagina/catalogo.html?categoria=${l.id}" data-category-id="${l.id}">${l.name}</a>`).join("")}catch{}t.innerHTML=`
    <div class="header" id="site-header">
      <div class="container">
        <div class="header-inner">
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menú">☰</button>
          <a href="${e}index.html" class="header-logo">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="url(#logo-grad)"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/><defs><linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#6366f1"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs></svg>
            NovaStore
          </a>
          <div class="header-search">
            <span class="header-search-icon">🔍</span>
            <input type="text" id="global-search" placeholder="Buscar productos..." aria-label="Buscar productos">
          </div>
          <div class="header-actions">
            <a href="${e}pagina/carrito.html" title="Carrito" aria-label="Carrito de compras">
              🛒
              ${n>0?`<span class="cart-count" id="cart-count">${n>99?"99+":n}</span>`:""}
            </a>
            ${m}
          </div>
        </div>
      </div>
    </div>
    <nav class="nav" id="main-nav">
      <div class="container">
        <div class="nav-list" id="nav-list">
          <a href="${e}index.html">Inicio</a>
          <a href="${e}pagina/catalogo.html">Todos los productos</a>
          ${h}
        </div>
      </div>
    </nav>
  `;const f=document.getElementById("site-header");window.addEventListener("scroll",()=>{window.scrollY>20?f.classList.add("scrolled"):f.classList.remove("scrolled")});const g=document.getElementById("global-search");if(g){let c;g.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(()=>{const l=g.value.trim();window.location.href=`${e}pagina/catalogo.html${l?`?busqueda=${encodeURIComponent(l)}`:""}`},500)})}const $=document.getElementById("mobile-menu-btn"),b=document.getElementById("main-nav");$&&b&&$.addEventListener("click",()=>b.classList.toggle("open"));const q=document.getElementById("user-menu-btn"),v=document.getElementById("user-dropdown");q&&v&&(q.addEventListener("click",c=>{c.stopPropagation(),v.classList.toggle("open")}),document.addEventListener("click",()=>v.classList.remove("open")),v.addEventListener("click",c=>c.stopPropagation()));const E=document.getElementById("logout-btn");E&&E.addEventListener("click",async()=>{await w.signOut(),window.location.href=`${e}index.html`})}function T(){const t=document.getElementById("main-footer");if(!t)return;const e="/virtual-store/";t.innerHTML=`
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
  `}export{T as a,M as c,k as l,x as p};
