import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ProductComponent} from "../../components/product/index.js";
import { CartButtonComponent } from "../../components/cart-button/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, product) {
        this.parent = parent;
        this.product = product;
        this.id = product.id; // Добавить эту строку
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

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        })
    }

    renderData(item) {
        const productContainer = document.getElementById('product-container');
        const product = new ProductComponent(productContainer);
        product.render(item);
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(document.getElementById('buttons-container'))
        backButton.render(this.clickBack.bind(this))
        
        const cartButton = new CartButtonComponent(document.getElementById('buttons-container'))
        cartButton.render()
    
        this.getData()
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }
}