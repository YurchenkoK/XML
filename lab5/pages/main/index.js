import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {AddProductComponent} from "../../components/add-product/index.js";
import {AddProductButtonComponent} from "../../components/add-product-button/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.isAddFormVisible = false;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return (
            `
                <div class="text-center mb-4" style="margin-top: 35px;">
                    <img src="images/Avito_logo.svg" alt="Avito Logo" style="height: 60px;">
                </div>
                <div id="main-page" class="d-flex flex-wrap justify-content-center"></div>
                <div id="add-product-section" class="container mt-4"></div>
            `
        );
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        // Очищаем контейнер перед рендерингом
        this.pageRoot.innerHTML = '';
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    renderAddProductSection() {
        const addProductSection = document.getElementById('add-product-section');
        
        // Кнопка для показа формы
        const addProductButton = new AddProductButtonComponent(addProductSection);
        addProductButton.render(this.toggleAddForm.bind(this));

        // Форма добавления (изначально скрыта)
        const addProductForm = new AddProductComponent(addProductSection);
        addProductForm.render(this.onProductAdded.bind(this));
        addProductForm.hide(); // Скрываем форму изначально
    }

    toggleAddForm() {
        const addProductComponent = document.getElementById('add-product-component');
        const button = document.getElementById('show-add-form-btn');
        
        if (this.isAddFormVisible) {
            addProductComponent.style.display = 'none';
            button.textContent = 'Добавить новый товар';
            this.isAddFormVisible = false;
        } else {
            addProductComponent.style.display = 'block';
            button.textContent = 'Скрыть форму';
            this.isAddFormVisible = true;
        }
    }

    onProductAdded() {
        // Перезагружаем данные и скрываем форму
        this.getData();
        const addProductComponent = document.getElementById('add-product-component');
        const button = document.getElementById('show-add-form-btn');
        
        addProductComponent.style.display = 'none';
        button.textContent = 'Добавить новый товар';
        this.isAddFormVisible = false;
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        this.getData()
        this.renderAddProductSection()
    }

    clickCard(event) {
        const card = event.target.closest('[data-id]');
        const productId = card.getAttribute('data-id');
        const productPage = new ProductPage(this.parent, { id: productId });
        productPage.render();
    }
}