import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { CartButtonComponent } from "../../components/cart-button/index.js";

export class ProductPage {
    constructor(parent, product) {
        this.parent = parent;
        this.product = product; 
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
                <!-- Контент страницы продукта будет рендериться здесь -->
                <div id="product-container">
                    <!-- Здесь будет рендериться информация о товаре -->
                </div>
                <div id="buttons-container" class="d-flex mt-3" style="gap: 40px;">
            </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const productContainer = document.getElementById('product-container');
        const product = new ProductComponent(productContainer);
        product.render(this.product); 

        const ButtonsContainer = document.getElementById('buttons-container');
        const cartButton = new CartButtonComponent(ButtonsContainer);
        const backButton = new BackButtonComponent(ButtonsContainer);
        cartButton.render(); 
        backButton.render(this.clickBack.bind(this));
        
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.activeProductId = this.product.id;
        mainPage.render();
    }
}