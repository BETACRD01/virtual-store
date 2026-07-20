import"./auth.service-COov5E7B.js";import{l as S,a as T,p as l}from"./footer-BeBew-19.js";import{c as L,f as E}from"./currency-BUz-WTj3.js";import{s as f}from"./dom-Dz1M3mpB.js";const I="/virtual-store/",M="★★★★★",$=[127,89,234,56,312,78,145,67,198,43,91,201,55,167,88,310,72,134,99,210];function u(a,o){const i=L(a.price,a.offer_price),p=o%5+1,n=M.slice(0,p),c=$[o%$.length],r=Math.random()>.4;return`
        <a href="${I}pagina/producto.html?id=${a.id}" class="ae-prod-card">
          <div class="ae-prod-img-wrap">
            <img src="${a.main_image_url||""}" alt="${f(a.name)}" class="ae-prod-img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=ae-prod-img-placeholder>📦</div>'">
            ${i>0?`<span class="ae-prod-discount">-${i}%</span>`:""}
            ${o%3===0?'<span class="ae-prod-choice">Choice</span>':""}
            <button class="ae-prod-wishlist" onclick="event.preventDefault();event.stopPropagation()">♥</button>
          </div>
          <div class="ae-prod-body">
            <div class="ae-prod-rating">
              <span class="ae-prod-stars">${n}</span>
              <span>(${c})</span>
            </div>
            <div class="ae-prod-name">${f(a.name)}</div>
            <div class="ae-prod-price-row">
              <span class="ae-prod-price-current">${E(a.offer_price||a.price)}</span>
              ${a.offer_price?`<span class="ae-prod-price-old">${E(a.price)}</span>`:""}
            </div>
            ${r?'<div class="ae-prod-shipping">✅ Envío gratis</div>':""}
          </div>
        </a>
      `}async function w(){await S(),T();const a=document.getElementById("carousel-track"),o=document.querySelectorAll(".ae-carousel-dot"),i=document.getElementById("carousel-prev"),p=document.getElementById("carousel-next");let n=0;const c=3;function r(t){n=t,a.style.transform=`translateX(-${n*100}%)`,o.forEach((e,s)=>e.classList.toggle("active",s===n))}i.addEventListener("click",()=>r((n-1+c)%c)),p.addEventListener("click",()=>r((n+1)%c)),o.forEach(t=>t.addEventListener("click",()=>r(parseInt(t.dataset.slide)))),setInterval(()=>r((n+1)%c),5e3);function g(){const t=new Date;t.setHours(23,59,59,999);const e=t-new Date,s=Math.floor(e/36e5),d=Math.floor(e%36e5/6e4),m=Math.floor(e%6e4/1e3);document.getElementById("cd-hours").textContent=String(s).padStart(2,"0"),document.getElementById("cd-minutes").textContent=String(d).padStart(2,"0"),document.getElementById("cd-seconds").textContent=String(m).padStart(2,"0")}g(),setInterval(g,1e3);try{const t=await l.getActiveCategories(),e=["📱","💻","👗","👟","🏠","💄","⚽","📚","🧸","🔧","🎵","🐾","⌚","💎","🎮","🚗","🏕️","🍷","💊","✈️"],s=document.getElementById("category-grid");s.innerHTML=t.map((d,m)=>`
          <a href="${I}pagina/catalogo.html?categoria=${d.id}" class="ae-cat-card">
            <span class="ae-cat-icon">${e[m%e.length]}</span>
            <span class="ae-cat-name">${f(d.name)}</span>
            <span class="ae-cat-count">Ver más</span>
          </a>
        `).join("")}catch{}const v=document.getElementById("flash-products");try{const t=await l.getOfferProducts(5);v.innerHTML=t.map((e,s)=>u(e,s)).join("")}catch{v.innerHTML='<div class="empty-state" style="grid-column:1/-1"><p>Sin ofertas disponibles.</p></div>'}const h=document.getElementById("featured-products");try{const t=await l.getFeaturedProducts(5);h.innerHTML=t.map((e,s)=>u(e,s)).join("")}catch{h.innerHTML='<div class="empty-state" style="grid-column:1/-1"><p>Error al cargar productos.</p></div>'}const y=document.getElementById("offer-products");try{const t=await l.getOfferProducts(5);y.innerHTML=t.map((e,s)=>u(e,s+10)).join("")}catch{y.innerHTML='<div class="empty-state" style="grid-column:1/-1"><p>Sin ofertas disponibles.</p></div>'}}w();
