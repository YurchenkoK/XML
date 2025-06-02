import { CarouselComponent } from "../../components/carousel/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.activeProductId = null; // Хранение ID активного товара
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
                <!-- Карусель будет рендериться здесь -->
            </div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "./images/samsung.jpg",
                title: "Смартфон Samsung Galaxy",
                price: "80,000 руб.",
                description: "Мощный смартфон с AMOLED-дисплеем и тройной камерой."
            },
            {
                id: 2,
                src: "./images/notebook.jpg",
                title: "Ноутбук Apple Macbook Pro", 
                price: "130,000 руб.",
                description: "Универсальный ноутбук для работы и развлечений."
            },
            {
                id: 3,
                src: "./images/headphones.jpg",
                title: "Беспроводные наушники Sony",
                price: "13,000 руб.",
                description: "Наушники с шумоподавлением и высоким качеством звука."
            },
            {
                id: 4,
                src: "./images/watch.jpg",
                title: "Смарт-часы Apple Watch",
                price: "30,000 руб.",
                description: "Умные часы с множеством функций для здоровья и фитнеса."
            },
            {
                id: 5,
                src: "./images/ps.jpg",
                title: "Игровая консоль PlayStation 5",
                price: "60,000 руб.",
                description: "Новая игровая консоль с поддержкой 4K-гейминга."
            },
        ];
    }

    render() {
        console.log('Rendering MainPage with activeProductId:', this.activeProductId); // Лог для проверки
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Передаём activeProductId в CarouselComponent
        const carousel = new CarouselComponent(this.pageRoot, this.clickCard.bind(this), this.activeProductId);
        carousel.render(this.getData());
    }

    clickCard(item) {
        this.activeProductId = item.id; // Сохраняем ID выбранного товара
        const productPage = new ProductPage(this.parent, item); // Передаём объект товара
        productPage.render();
    }
}