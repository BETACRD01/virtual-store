import{s as c,g as h,a as E}from"./auth.service-COov5E7B.js";const L="virtual_store_cart";function b(){try{return JSON.parse(localStorage.getItem(L)||"[]")}catch{return[]}}function q(a){localStorage.setItem(L,JSON.stringify(a))}function O(){localStorage.removeItem(L)}const j={async getCart(a){if(!a)return b();const{data:e}=await c.from("carts").select("id").eq("user_id",a).maybeSingle();if(!e)return[];const{data:t}=await c.from("cart_items").select("*, product:products(*)").eq("cart_id",e.id);return t||[]},async addItem(a,e,t=1){const{data:i}=await c.from("products").select("*").eq("id",e).single();if(!i||!i.is_active)throw new Error("Producto no disponible.");if(i.stock<t)throw new Error("Stock insuficiente.");if(!a){const r=b(),s=r.find(g=>g.product_id===e);return s?s.quantity=Math.min(s.quantity+t,i.stock):r.push({product_id:e,quantity:t,unit_price:i.offer_price||i.price,product:i}),q(r),r}let{data:n}=await c.from("carts").select("id").eq("user_id",a).maybeSingle();if(!n){const{data:r}=await c.from("carts").insert({user_id:a}).select().single();n=r}const{data:u}=await c.from("cart_items").select("*").eq("cart_id",n.id).eq("product_id",e).maybeSingle();if(u){const r=Math.min(u.quantity+t,i.stock);await c.from("cart_items").update({quantity:r,unit_price:i.offer_price||i.price}).eq("id",u.id)}else await c.from("cart_items").insert({cart_id:n.id,product_id:e,quantity:t,unit_price:i.offer_price||i.price});return this.getCart(a)},async updateQuantity(a,e,t){if(t<1)return this.removeItem(a,e);if(!a){const n=b(),u=n.find(r=>r.product_id===e);return u&&(u.quantity=t),q(n),n}const{data:i}=await c.from("carts").select("id").eq("user_id",a).single();return await c.from("cart_items").update({quantity:t}).eq("cart_id",i.id).eq("product_id",e),this.getCart(a)},async removeItem(a,e){if(!a){const i=b().filter(n=>n.product_id!==e);return q(i),i}const{data:t}=await c.from("carts").select("id").eq("user_id",a).single();return await c.from("cart_items").delete().eq("cart_id",t.id).eq("product_id",e),this.getCart(a)},async clearCart(a){if(!a)return O(),[];const{data:e}=await c.from("carts").select("id").eq("user_id",a).single();return e&&await c.from("cart_items").delete().eq("cart_id",e.id),[]},async syncLocalCart(a){const e=b();if(!e.length)return this.getCart(a);for(const t of e)try{await this.addItem(a,t.product_id,t.quantity)}catch{}return O(),this.getCart(a)}},N={async getProducts({categoryId:a,search:e,featured:t,offers:i,sort:n,page:u=1,limit:r=12}={}){let s=c.from("products").select("*, category:categories(name, slug)",{count:"exact"}).eq("is_active",!0);a&&(s=s.eq("category_id",a)),e&&(s=s.ilike("name",`%${e}%`)),t&&(s=s.eq("is_featured",!0)),i&&(s=s.not("offer_price","is",null).not("offer_price","eq",0)),n==="price_asc"?s=s.order("price",{ascending:!0}):n==="price_desc"?s=s.order("price",{ascending:!1}):n==="name_asc"?s=s.order("name",{ascending:!0}):n==="name_desc"?s=s.order("name",{ascending:!1}):s=s.order("created_at",{ascending:!1});const g=(u-1)*r,{data:p,error:w,count:_}=await s.range(g,g+r-1);if(w)throw new Error(h(w));return{products:p||[],count:_||0}},async getProductBySlug(a){const{data:e,error:t}=await c.from("products").select("*, category:categories(name, slug)").eq("slug",a).eq("is_active",!0).single();if(t)throw new Error(h(t));return e},async getProductById(a){const{data:e,error:t}=await c.from("products").select("*").eq("id",a).single();if(t&&t.code!=="PGRST116")throw new Error(h(t));return e},async getProductImages(a){const{data:e,error:t}=await c.from("product_images").select("*").eq("product_id",a).order("display_order");if(t)throw new Error(h(t));return e||[]},async getActiveCategories(){const{data:a,error:e}=await c.from("categories").select("*").eq("is_active",!0).order("name");if(e)throw new Error(h(e));return a||[]},async getFeaturedProducts(a=8){const{data:e,error:t}=await c.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).eq("is_featured",!0).limit(a);if(t)throw new Error(h(t));return e||[]},async getOfferProducts(a=8){const{data:e,error:t}=await c.from("products").select("*, category:categories(name, slug)").eq("is_active",!0).not("offer_price","is",null).not("offer_price","eq",0).limit(a);if(t)throw new Error(h(t));return e||[]}};async function F(){var T,M,U;const a=document.getElementById("main-header");if(!a)return;const e="/virtual-store/",t=await E.getSession(),i=t==null?void 0:t.user,n=i?await E.getProfile(i.id):null,u=(n==null?void 0:n.role)||"customer";let r=0;try{r=(await j.getCart(i==null?void 0:i.id)).reduce((l,d)=>l+(d.quantity||1),0)}catch{}const s=n!=null&&n.full_name?n.full_name.split(" ").map(o=>o[0]).join("").slice(0,2).toUpperCase():((M=(T=i==null?void 0:i.email)==null?void 0:T[0])==null?void 0:M.toUpperCase())||"?";let g="",p=[];try{p=await N.getActiveCategories();const o=["📱","💻","👗","👟","🏠","💄","⚽","📚","🧸","🔧","🎵","🐾","⌚","💎","🎮","🚗","🏕️","🍷","💊","✈️"];g=p.slice(0,6).map((l,d)=>`<a href="${e}pagina/catalogo.html?categoria=${l.id}"><span class="cat-icon">${o[d%o.length]}</span>${l.name}</a>`).join("")}catch{}const w=r>0?`<span class="ae-cart-badge" id="cart-count">${r>99?"99+":r}</span>`:"",_=i?`<button class="ae-header-btn" id="user-menu-btn" title="Mi cuenta">
        <span class="ae-btn-icon">${s}</span>
        <span class="ae-btn-label">Perfil</span>
      </button>
      <div class="user-dropdown" id="user-dropdown">
        <div class="user-dropdown-header">
          <div class="user-dropdown-avatar">${s}</div>
          <div>
            <div class="user-dropdown-name">${(n==null?void 0:n.full_name)||"Usuario"}</div>
            <div class="user-dropdown-email">${i.email}</div>
          </div>
        </div>
        <div class="user-dropdown-divider"></div>
        <a href="${e}cuenta/perfil.html" class="user-dropdown-item">👤 Mi perfil</a>
        <a href="${e}cuenta/pedidos.html" class="user-dropdown-item">📦 Mis pedidos</a>
        <a href="${e}cuenta/direcciones.html" class="user-dropdown-item">📍 Direcciones</a>
        <a href="${e}cuenta/favoritos.html" class="user-dropdown-item">♥ Favoritos</a>
        ${u==="admin"?`<div class="user-dropdown-divider"></div><a href="${e}admin/" class="user-dropdown-item">⚙️ Panel admin</a>`:""}
        <div class="user-dropdown-divider"></div>
        <button class="user-dropdown-item" id="logout-btn">🚪 Cerrar sesión</button>
      </div>`:`<a href="${e}auth/login.html" class="ae-header-btn">
        <span class="ae-btn-icon">👤</span>
        <span class="ae-btn-label">Acceder</span>
      </a>`,R=p.length>0?`<div class="ae-nav-dropdown" id="mega-dropdown">
        ${p.map((o,l)=>{const d=["📱","💻","👗","👟","🏠","💄","⚽","📚","🧸","🔧","🎵","🐾","⌚","💎","🎮","🚗","🏕️","🍷","💊","✈️"];return`<a href="${e}pagina/catalogo.html?categoria=${o.id}"><span class="cat-icon">${d[l%d.length]}</span>${o.name}</a>`}).join("")}
      </div>`:"";a.innerHTML=`
    <div class="ae-top-bar">
      <div class="ae-top-bar-inner">
        <a href="#">Envío a <strong>República Dominicana</strong></a>
        <a href="#">ESP</a>
        <a href="#">USD</a>
        <a href="#">Ayuda</a>
      </div>
    </div>
    <div class="ae-header" id="site-header">
      <div class="ae-header-inner">
        <button class="ae-menu-btn" id="ae-menu-btn" aria-label="Menú">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="${e}index.html" class="ae-logo">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="10" fill="#f79917"/><path d="M12 28V16l8-6 8 6v12h-6v-8h-4v8H12z" fill="#fff"/><defs><linearGradient id="logo-grad2" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#f79917"/><stop offset="1" stop-color="#e88f0f"/></linearGradient></defs></svg>
          <span class="ae-logo-text">NovaStore</span>
        </a>
        <div class="ae-search-wrap">
          <input type="text" id="global-search" placeholder="Buscar en NovaStore..." aria-label="Buscar productos">
          <button class="ae-search-btn" id="search-submit" aria-label="Buscar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
        <div class="ae-header-actions">
          <a href="${e}pagina/carrito.html" class="ae-header-btn" title="Carrito">
            <span class="ae-btn-icon" style="position:relative">
              🛒
              ${w}
            </span>
            <span class="ae-btn-label">Carrito</span>
          </a>
          ${_}
        </div>
      </div>
    </div>
    <nav class="ae-nav" id="ae-nav">
      <button class="ae-nav-close" id="ae-nav-close">✕</button>
      <div class="ae-nav-inner" id="ae-nav-inner">
        <div class="ae-nav-item">
          <button class="ae-nav-link" id="cat-trigger">
            📦 Categorías
            <span class="nav-arrow">▼</span>
          </button>
          ${R}
        </div>
        <a href="${e}index.html" class="ae-nav-link">Inicio</a>
        <a href="${e}pagina/catalogo.html" class="ae-nav-link">Todos los productos</a>
        ${p.slice(0,5).map(o=>`<a href="${e}pagina/catalogo.html?categoria=${o.id}" class="ae-nav-link">${o.name}</a>`).join("")}
        <a href="${e}pagina/catalogo.html?ofertas=true" class="ae-nav-link" style="color:#e52f20;font-weight:700">🔥 Ofertas</a>
      </div>
    </nav>
    <div class="mobile-search-overlay" id="mobile-search-overlay">
      <div class="search-overlay-inner">
        <input type="text" id="mobile-search-input" placeholder="Buscar en NovaStore..." autofocus>
        <button class="search-close-btn" id="mobile-search-close">✕</button>
      </div>
    </div>
    <div class="tab-bar" id="tab-bar">
      <div class="tab-bar-inner">
        <a href="${e}index.html" class="tab-bar-item ${window.location.pathname.endsWith("index.html")||window.location.pathname.replace(e,"").replace(/\/$/,"")===""?"active":""}">
          <span class="tab-icon">🏠</span>
          <span class="tab-label">Inicio</span>
        </a>
        <a href="${e}pagina/catalogo.html" class="tab-bar-item ${window.location.pathname.includes("catalogo")?"active":""}">
          <span class="tab-icon">🛍️</span>
          <span class="tab-label">Catálogo</span>
        </a>
        <a href="${e}pagina/carrito.html" class="tab-bar-item ${window.location.pathname.includes("carrito")?"active":""}">
          <span class="tab-icon">🛒</span>
          <span class="tab-label">Carrito</span>
          ${r>0?`<span class="tab-badge" id="tab-cart-badge">${r>99?"99+":r}</span>`:""}
        </a>
        <a href="${e}cuenta/favoritos.html" class="tab-bar-item ${window.location.pathname.includes("favoritos")?"active":""}">
          <span class="tab-icon">♥</span>
          <span class="tab-label">Favs</span>
        </a>
        <a href="${i?e+"cuenta/perfil.html":e+"auth/login.html"}" class="tab-bar-item ${window.location.pathname.includes("cuenta")||window.location.pathname.includes("perfil")?"active":""}">
          <span class="tab-icon">👤</span>
          <span class="tab-label">Perfil</span>
        </a>
      </div>
    </div>
  `,document.body.classList.add("has-tab-bar");const m=document.getElementById("global-search");if(m){let o;m.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(()=>{const l=m.value.trim();l&&(window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(l)}`)},500)}),m.addEventListener("keydown",l=>{if(l.key==="Enter"){clearTimeout(o);const d=m.value.trim();d&&(window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(d)}`)}})}(U=document.getElementById("search-submit"))==null||U.addEventListener("click",()=>{const o=m==null?void 0:m.value.trim();o&&(window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(o)}`)});const C=document.getElementById("ae-menu-btn"),f=document.getElementById("ae-nav"),k=document.getElementById("ae-nav-close");C&&f&&(C.addEventListener("click",()=>{f.classList.toggle("open-mobile"),document.body.style.overflow=f.classList.contains("open-mobile")?"hidden":""}),k&&k.addEventListener("click",()=>{f.classList.remove("open-mobile"),document.body.style.overflow=""}),f.addEventListener("click",o=>{o.target===f&&(f.classList.remove("open-mobile"),document.body.style.overflow="")}));const B=document.getElementById("user-menu-btn"),y=document.getElementById("user-dropdown");B&&y&&(B.addEventListener("click",o=>{o.stopPropagation(),y.classList.toggle("open")}),document.addEventListener("click",()=>y.classList.remove("open")),y.addEventListener("click",o=>o.stopPropagation()));const x=document.getElementById("logout-btn");x&&x.addEventListener("click",async()=>{await E.signOut(),window.location.href=`${e}index.html`});const S=document.getElementById("mobile-search-btn"),$=document.getElementById("mobile-search-overlay"),v=document.getElementById("mobile-search-input"),I=document.getElementById("mobile-search-close");if(S&&$&&v&&I){S.addEventListener("click",()=>{$.classList.add("open"),setTimeout(()=>v.focus(),100)}),I.addEventListener("click",()=>$.classList.remove("open"));let o;v.addEventListener("input",()=>{clearTimeout(o),o=setTimeout(()=>{const l=v.value.trim();l&&(window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(l)}`)},500)}),v.addEventListener("keydown",l=>{if(l.key==="Enter"){clearTimeout(o);const d=v.value.trim();d?window.location.href=`${e}pagina/catalogo.html?busqueda=${encodeURIComponent(d)}`:$.classList.remove("open")}})}const P=document.getElementById("tab-cart-badge");P&&P.classList.add("bump")}function H(){const a=document.getElementById("main-footer");if(!a)return;const e="/virtual-store/";a.innerHTML=`
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
  `}export{H as a,j as c,F as l,N as p};
