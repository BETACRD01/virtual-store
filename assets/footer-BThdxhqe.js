import{s as n,g as u,a as q}from"./auth.service-DSnWIW-s.js";const B="virtual_store_cart";function g(){try{return JSON.parse(localStorage.getItem(B)||"[]")}catch{return[]}}function L(t){localStorage.setItem(B,JSON.stringify(t))}function U(){localStorage.removeItem(B)}const F={async getCart(t){if(!t)return g();const{data:e}=await n.from("carts").select("id").eq("user_id",t).maybeSingle();if(!e)return[];const{data:a}=await n.from("cart_items").select("*, product:products(*)").eq("cart_id",e.id);return a||[]},async addItem(t,e,a=1){const{data:r}=await n.from("products").select("*").eq("id",e).single();if(!r||!r.is_active)throw new Error("Producto no disponible.");if(r.stock<a)throw new Error("Stock insuficiente.");if(!t){const o=g(),s=o.find(m=>m.product_id===e);return s?s.quantity=Math.min(s.quantity+a,r.stock):o.push({product_id:e,quantity:a,unit_price:r.offer_price||r.price,product:r}),L(o),o}let{data:i}=await n.from("carts").select("id").eq("user_id",t).maybeSingle();if(!i){const{data:o}=await n.from("carts").insert({user_id:t}).select().single();i=o}const{data:l}=await n.from("cart_items").select("*").eq("cart_id",i.id).eq("product_id",e).maybeSingle();if(l){const o=Math.min(l.quantity+a,r.stock);await n.from("cart_items").update({quantity:o,unit_price:r.offer_price||r.price}).eq("id",l.id)}else await n.from("cart_items").insert({cart_id:i.id,product_id:e,quantity:a,unit_price:r.offer_price||r.price});return this.getCart(t)},async updateQuantity(t,e,a){if(a<1)return this.removeItem(t,e);if(!t){const i=g(),l=i.find(o=>o.product_id===e);return l&&(l.quantity=a),L(i),i}const{data:r}=await n.from("carts").select("id").eq("user_id",t).single();return await n.from("cart_items").update({quantity:a}).eq("cart_id",r.id).eq("product_id",e),this.getCart(t)},async removeItem(t,e){if(!t){const r=g().filter(i=>i.product_id!==e);return L(r),r}const{data:a}=await n.from("carts").select("id").eq("user_id",t).single();return await n.from("cart_items").delete().eq("cart_id",a.id).eq("product_id",e),this.getCart(t)},async clearCart(t){if(!t)return U(),[];const{data:e}=await n.from("carts").select("id").eq("user_id",t).single();return e&&await n.from("cart_items").delete().eq("cart_id",e.id),[]},async syncLocalCart(t){const e=g();if(!e.length)return this.getCart(t);for(const a of e)try{await this.addItem(t,a.product_id,a.quantity)}catch{}return U(),this.getCart(t)}},A={async getProducts({categoryId:t,search:e,featured:a,offers:r,sort:i,page:l=1,limit:o=12}={}){let s=n.from("products").select("*, category:categories(name, slug)",{count:"exact"}).eq("is_active",!0);t&&(s=s.eq("category_id",t)),e&&(s=s.ilike("name",`%${e}%`)),a&&(s=s.eq("is_featured",!0)),r&&(s=s.not("offer_price","is",null).not("offer_price","eq",0)),i==="price_asc"?s=s.order("price",{ascending:!0}):i==="price_desc"?s=s.order("price",{ascending:!1}):i==="name_asc"?s=s.order("name",{ascending:!0}):i==="name_desc"?s=s.order("name",{ascending:!1}):s=s.order("created_at",{ascending:!1});const m=(l-1)*o,{data:v,error:b,count:w}=await s.range(m,m+o-1);if(b)throw new Error(u(b));return{products:v||[],count:w||0}},async getProductBySlug(t){const{data:e,error:a}=await n.from("products").select("*, category:categories(name, slug)").eq("slug",t).eq("is_active",!0).single();if(a)throw new Error(u(a));return e},async getProductById(t){const{data:e,error:a}=await n.from("products").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw new Error(u(a));return e},async getProductImages(t){const{data:e,error:a}=await n.from("product_images").select("*").eq("product_id",t).order("display_order");if(a)throw new Error(u(a));return e||[]},async getActiveCategories(){const{data:t,error:e}=await n.from("categories").select("*").eq("is_active",!0).order("name");if(e)throw new Error(u(e));return t||[]},async getFeaturedProducts(t=8){const{data:e,error:a}=await n.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).eq("is_featured",!0).limit(t);if(a)throw new Error(u(a));return e||[]},async getOfferProducts(t=8){const{data:e,error:a}=await n.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).not("offer_price","is",null).not("offer_price","eq",0).limit(t);if(a)throw new Error(u(a));return e||[]}};async function N(){var T,O;const t=document.getElementById("main-header");if(!t)return;const e="/virtual-store/",a=await q.getSession(),r=a==null?void 0:a.user,i=r?await q.getProfile(r.id):null,l=(i==null?void 0:i.role)||"customer";let o=0;try{o=(await F.getCart(r==null?void 0:r.id)).reduce((d,$)=>d+($.quantity||1),0)}catch{}const s=i!=null&&i.full_name?i.full_name.split(" ").map(c=>c[0]).join("").slice(0,2).toUpperCase():((O=(T=r==null?void 0:r.email)==null?void 0:T[0])==null?void 0:O.toUpperCase())||"?",m=r?`<div class="user-menu-wrapper">
        <button class="header-avatar" id="user-menu-btn" aria-label="Menú de usuario">${s}</button>
        <div class="user-dropdown" id="user-dropdown">
          <div class="user-dropdown-header">
            <div class="user-dropdown-avatar">${s}</div>
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
          ${l==="admin"?`<div class="user-dropdown-divider"></div><a href="${e}admin/" class="user-dropdown-item">⚙️ Panel admin</a>`:""}
          <div class="user-dropdown-divider"></div>
          <button class="user-dropdown-item" id="logout-btn">🚪 Cerrar sesión</button>
        </div>
      </div>`:`<a href="${e}auth/login.html" class="btn btn-primary btn-sm" style="padding:0.5rem 1.25rem;font-size:0.8rem">Iniciar sesión</a>`;let v="";try{v=(await A.getActiveCategories()).slice(0,6).map(d=>`<a href="${e}pagina/catalogo.html?categoria=${d.id}" data-category-id="${d.id}">${d.name}</a>`).join("")}catch{}const b=o>0?`<span class="cart-count" id="cart-count">${o>99?"99+":o}</span>`:"",w=window.location.pathname.replace(e,"").replace(/\/$/,"")||"index.html";function p(c){return w.includes(c)?"active":""}t.innerHTML=`
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
            <button class="mobile-search-btn" id="mobile-search-btn" aria-label="Buscar">🔍</button>
            <a href="${e}pagina/carrito.html" class="header-action-btn" title="Carrito" aria-label="Carrito de compras">
              🛒
              ${b}
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
          ${v}
        </div>
      </div>
    </nav>
    <div class="mobile-search-overlay" id="mobile-search-overlay">
      <div class="search-overlay-inner">
        <input type="text" id="mobile-search-input" placeholder="Buscar productos..." autofocus>
        <button class="search-close-btn" id="mobile-search-close">✕</button>
      </div>
    </div>
    <div class="tab-bar" id="tab-bar">
      <div class="tab-bar-inner">
        <a href="${e}index.html" class="tab-bar-item ${p("index.html")||w===""?"active":""}">
          <span class="tab-icon">🏠</span>
          <span class="tab-label">Inicio</span>
        </a>
        <a href="${e}pagina/catalogo.html" class="tab-bar-item ${p("catalogo")?"active":""}">
          <span class="tab-icon">🛍️</span>
          <span class="tab-label">Catálogo</span>
        </a>
        <a href="${e}pagina/carrito.html" class="tab-bar-item ${p("carrito")?"active":""}">
          <span class="tab-icon">🛒</span>
          <span class="tab-label">Carrito</span>
          ${o>0?`<span class="tab-badge" id="tab-cart-badge">${o>99?"99+":o}</span>`:""}
        </a>
        <a href="${e}cuenta/favoritos.html" class="tab-bar-item ${p("favoritos")?"active":""}">
          <span class="tab-icon">♥</span>
          <span class="tab-label">Favs</span>
        </a>
        <a href="${r?e+"cuenta/perfil.html":e+"auth/login.html"}" class="tab-bar-item ${p("cuenta")||p("perfil")?"active":""}">
          <span class="tab-icon">👤</span>
          <span class="tab-label">Perfil</span>
        </a>
      </div>
    </div>
  `,document.body.classList.add("has-tab-bar");const C=document.getElementById("site-header");window.addEventListener("scroll",()=>{window.scrollY>20?C.classList.add("scrolled"):C.classList.remove("scrolled")});const E=document.getElementById("global-search");if(E){let c;E.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(()=>{const d=E.value.trim();window.location.href=`${e}pagina/catalogo.html${d?`?busqueda=${encodeURIComponent(d)}`:""}`},500)})}const S=document.getElementById("mobile-menu-btn"),f=document.getElementById("main-nav");S&&f&&(S.addEventListener("click",()=>{f.classList.toggle("open"),document.body.style.overflow=f.classList.contains("open")?"hidden":""}),f.addEventListener("click",c=>{c.target===f&&(f.classList.remove("open"),document.body.style.overflow="")}));const x=document.getElementById("user-menu-btn"),y=document.getElementById("user-dropdown");x&&y&&(x.addEventListener("click",c=>{c.stopPropagation(),y.classList.toggle("open")}),document.addEventListener("click",()=>y.classList.remove("open")),y.addEventListener("click",c=>c.stopPropagation()));const k=document.getElementById("logout-btn");k&&k.addEventListener("click",async()=>{await q.signOut(),window.location.href=`${e}index.html`});const I=document.getElementById("mobile-search-btn"),_=document.getElementById("mobile-search-overlay"),h=document.getElementById("mobile-search-input"),M=document.getElementById("mobile-search-close");if(I&&_&&h&&M){I.addEventListener("click",()=>{_.classList.add("open"),setTimeout(()=>h.focus(),100)}),M.addEventListener("click",()=>{_.classList.remove("open")});let c;h.addEventListener("input",()=>{clearTimeout(c),c=setTimeout(()=>{const d=h.value.trim();d&&(window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(d)}`)},500)}),h.addEventListener("keydown",d=>{if(d.key==="Enter"){clearTimeout(c);const $=h.value.trim();$?window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent($)}`:_.classList.remove("open")}})}const P=document.getElementById("tab-cart-badge");P&&P.classList.add("bump")}function R(){const t=document.getElementById("main-footer");if(!t)return;const e="/virtual-store/";t.innerHTML=`
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h3>NovaStore</h3>
            <p>Tu tienda de confianza con los mejores productos y los mejores precios.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="WhatsApp">💬</a>
            </div>
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
            <p>contacto@novastore.com</p>
            <p>+52 55 1234 5678</p>
            <p>Lun - Vie: 9:00 - 18:00</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} NovaStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `}export{R as a,F as c,N as l,A as p};
