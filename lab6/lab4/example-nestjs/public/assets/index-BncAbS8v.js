(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();class u{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card" id="click-card-${t.id}" data-id="${t.id}" 
                     style="width: 232px; margin: 10px; height: 300px; display: flex; flex-direction: column; cursor: pointer;">
                    <div style="width: 100%; height: 168px; overflow: hidden; position: relative; background-color:rgb(255, 255, 255);">
                        <img class="card-img-top" src="${t.src}" alt="${t.title}" 
                             style="width: 100%; height: 100%; object-fit: contain; object-position: center;">
                    </div>  
                    <div class="card-body" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 class="card-title">${t.title}</h5>
                        </div>
                        <div>
                            <p class="card-text" style="margin-bottom: 10px;">${t.text}</p>
                        </div>
                    </div>
                </div>
            `}render(t,e){const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n),document.getElementById(`click-card-${t.id}`).addEventListener("click",e)}}class p{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-secondary" type="button">Назад</button>
            `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class h{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card" style="width: 540px; border: none;">
                    <div style="width: 100%; padding-top: 56.25%; position: relative; overflow: hidden; background-color: #ffffff;">
                        <img src="${t.src}" class="card-img-top" alt="${t.title}" 
                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; object-position: center;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${t.title}</h5>
                        <p class="card-text">${t.description}</p>
                        <p class="card-text"><strong>Цена: ${t.text}</strong></p>
                    </div>
                </div>
            `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class m{constructor(){this.notifications=[]}show(t,e=2e3){const n=this.createNotification(t,e);return document.body.appendChild(n),this.notifications.unshift(n),this.updatePositions(),setTimeout(()=>{n.style.opacity="1",n.style.transform="translateX(0)"},10),setTimeout(()=>{this.hide(n)},e),n}createNotification(t,e){const n=document.createElement("div");return n.textContent=t,n.style.cssText=`
            position: fixed;
            right: 20px;
            background-color: #007bff;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-in-out;
            max-width: 300px;
            word-wrap: break-word;
            cursor: pointer;
        `,n.title="Нажмите, чтобы закрыть",n.addEventListener("click",()=>{this.hide(n)}),n}hide(t){t.parentNode&&(t.style.opacity="0",t.style.transform="translateX(100%)",setTimeout(()=>{t.parentNode&&(t.parentNode.removeChild(t),this.removeFromArray(t),this.updatePositions())},250))}removeFromArray(t){const e=this.notifications.indexOf(t);e>-1&&this.notifications.splice(e,1)}updatePositions(){this.notifications.forEach((t,e)=>{t.parentNode&&(t.style.bottom=`${20+(this.notifications.length-1-e)*70}px`)})}hideAll(){this.notifications.forEach(t=>{this.hide(t)})}}const a=new m;class g{constructor(t){this.parent=t}addListeners(){document.getElementById("cart-button").addEventListener("click",this.handleCartClick.bind(this))}handleCartClick(){a.show("Добавлено в корзину!")}getHTML(){return`
                <button id="cart-button" class="btn btn-primary" type="button" style="height: 40px; width: 100px;">В корзину</button>
            `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.addListeners()}}class b{async get(t,e){try{const n=await fetch(t),o=n.ok?await n.json():null;e(o,n.status)}catch(n){console.error("Ошибка GET запроса:",n),e(null,0)}}async post(t,e,n){try{const o=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=o.ok?await o.json():null;n(s,o.status)}catch(o){console.error("Ошибка POST запроса:",o),n(null,0)}}async patch(t,e,n){try{const o=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),s=o.ok?await o.json():null;n(s,o.status)}catch(o){console.error("Ошибка PATCH запроса:",o),n(null,0)}}async delete(t,e){try{const n=await fetch(t,{method:"DELETE"}),o=n.ok?await n.json():null;e(o,n.status)}catch(n){console.error("Ошибка DELETE запроса:",n),e(null,0)}}}const d=new b;class f{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const c=new f;class y{constructor(t,e){this.parent=t,this.product=e,this.id=e.id}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
            <div id="product-page" class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
                <!-- Контент страницы продукта будет рендериться здесь -->
                <div id="product-container">
                    <!-- Здесь будет рендериться информация о товаре -->
                </div>
                <div id="buttons-container" class="d-flex mt-3" style="gap: 40px;">
            </div>
            </div>
        `}getData(){d.get(c.getStockById(this.id),t=>{this.renderData(t)})}renderData(t){const e=document.getElementById("product-container");new h(e).render(t)}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(document.getElementById("buttons-container")).render(this.clickBack.bind(this)),new g(document.getElementById("buttons-container")).render(),this.getData()}clickBack(){new l(this.parent).render()}}class v{constructor(t){this.parent=t}getHTML(){return`
            <div class="card mt-4 mb-4" style="width: 100%; max-width: 600px; margin: 0 auto;">
                <div class="card-header">
                    <h5 class="mb-0">Добавить новый товар</h5>
                </div>
                <div class="card-body">
                    <form id="add-product-form">
                        <div class="mb-3">
                            <label for="product-title" class="form-label">Название товара</label>
                            <input type="text" class="form-control" id="product-title">
                        </div>
                        <div class="mb-3">
                            <label for="product-description" class="form-label">Описание</label>
                            <textarea class="form-control" id="product-description" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="product-price" class="form-label">Цена</label>
                            <input type="text" class="form-control" id="product-price">
                        </div>
                        <div class="mb-3">
                            <label for="product-image" class="form-label">URL изображения</label>
                            <input type="text" class="form-control" id="product-image">
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-success">Добавить товар</button>
                            <button type="button" class="btn btn-secondary" id="cancel-btn">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        `}addListeners(){const t=document.getElementById("add-product-form"),e=document.getElementById("cancel-btn");t.addEventListener("submit",this.handleSubmit.bind(this)),e.addEventListener("click",this.handleCancel.bind(this))}handleSubmit(t){t.preventDefault();const e={title:document.getElementById("product-title").value,description:document.getElementById("product-description").value,text:document.getElementById("product-price").value,src:document.getElementById("product-image").value};d.post(c.createStock(),e,(n,o)=>{(o===200||o===201)&&(a.show("Товар успешно добавлен!"),this.onProductAdded&&this.onProductAdded())})}handleCancel(){this.hide()}show(){const t=document.getElementById("add-product-component");t&&(t.style.display="block")}hide(){const t=document.getElementById("add-product-component");t&&(t.style.display="none")}render(t=null){this.onProductAdded=t;const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",`<div id="add-product-component">${e}</div>`),this.addListeners()}}class x{constructor(t){this.parent=t}getHTML(){return`
            <div class="text-center mt-4 mb-4">
                <button id="show-add-form-btn" class="btn btn-success">
                    <i class="bi bi-plus-circle me-2"></i>Добавить новый товар
                </button>
            </div>
        `}addListeners(t){document.getElementById("show-add-form-btn").addEventListener("click",t)}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.addListeners(t)}}class l{constructor(t){this.parent=t,this.isAddFormVisible=!1}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
                <div class="text-center mb-4" style="margin-top: 35px;">
                    <img src="images/Avito_logo.svg" alt="Avito Logo" style="height: 60px;">
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
                <div id="add-product-section" class="container mt-4"></div>
            `}getData(){d.get(c.getStocks(),t=>{this.renderData(t)})}renderData(t){this.pageRoot.innerHTML="",t.forEach(e=>{new u(this.pageRoot).render(e,this.clickCard.bind(this))})}renderAddProductSection(){const t=document.getElementById("add-product-section");new x(t).render(this.toggleAddForm.bind(this));const n=new v(t);n.render(this.onProductAdded.bind(this)),n.hide()}toggleAddForm(){const t=document.getElementById("add-product-component"),e=document.getElementById("show-add-form-btn");this.isAddFormVisible?(t.style.display="none",e.textContent="Добавить новый товар",this.isAddFormVisible=!1):(t.style.display="block",e.textContent="Скрыть форму",this.isAddFormVisible=!0)}onProductAdded(){this.getData();const t=document.getElementById("add-product-component"),e=document.getElementById("show-add-form-btn");t.style.display="none",e.textContent="Добавить новый товар",this.isAddFormVisible=!1}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),this.getData(),this.renderAddProductSection()}clickCard(t){const n=t.target.closest("[data-id]").getAttribute("data-id");new y(this.parent,{id:n}).render()}}const L=document.getElementById("root"),w=new l(L);w.render();
