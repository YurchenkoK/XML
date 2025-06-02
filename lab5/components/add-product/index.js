import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';
import { notificationService } from '../notification/index.js';

export class AddProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
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
        `;
    }

    addListeners() {
        const form = document.getElementById('add-product-form');
        const cancelBtn = document.getElementById('cancel-btn');

        form.addEventListener('submit', this.handleSubmit.bind(this));
        cancelBtn.addEventListener('click', this.handleCancel.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        const newProduct = {
            title: document.getElementById('product-title').value,
            description: document.getElementById('product-description').value,
            text: document.getElementById('product-price').value,
            src: document.getElementById('product-image').value
        };

        ajax.post(stockUrls.createStock(), newProduct, (data, status) => {
            if (status === 200 || status === 201) {
                notificationService.show('Товар успешно добавлен!');
                if (this.onProductAdded) {
                    this.onProductAdded();
                }
            }
        });
    }

    handleCancel() {
        this.hide();
    }

    show() {
        const component = document.getElementById('add-product-component');
        if (component) {
            component.style.display = 'block';
        }
    }

    hide() {
        const component = document.getElementById('add-product-component');
        if (component) {
            component.style.display = 'none';
        }
    }

    render(onProductAdded = null) {
        this.onProductAdded = onProductAdded;
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', `<div id="add-product-component">${html}</div>`);
        this.addListeners();
    }
}