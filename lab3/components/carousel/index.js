export class CarouselComponent {
    constructor(parent, onCardClick, activeProductId = null) {
        this.parent = parent;
        this.onCardClick = onCardClick; 
        this.activeProductId = activeProductId; 
    }

    getHTML(data) {
        return `
            <div id="carousel" class="carousel slide mx-auto" data-bs-ride="carousel" style="max-width: 600px; position: relative;">
                <div class="carousel-inner" style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    ${data
                        .map((item, index) => {
                            let isActive = false;
                            if (this.activeProductId === item.id) {
                                isActive = true;
                            } else if (this.activeProductId === null && index === 0) {
                                isActive = true;
                            }
                            let activeClass = '';
                            if (isActive) {
                                activeClass = 'active';
                            }
                            return `
                                <div class="carousel-item ${activeClass}" data-id="${item.id}" style="cursor: pointer;">
                                    <img src="${item.src}" class="d-block w-100" alt="${item.title}" style="height: 400px; object-fit: cover;">
                                    <div class="carousel-caption d-block text-dark bg-light p-2" style="position: static;">
                                        <h5>${item.title}</h5>
                                        <p>${item.price}</p>
                                    </div>
                                </div>
                            `;
                        })
                        .join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev" style="top: 50%; transform: translateY(-50%); left: -75px;">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="filter: invert(1);"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next" style="top: 50%; transform: translateY(-50%); right: -75px;">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="filter: invert(1);"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    addClickHandlers(data) {
        const items = this.parent.querySelectorAll('.carousel-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.getAttribute('data-id'), 10);
                const product = data.find(p => p.id === productId);
                if (this.onCardClick) {
                    this.onCardClick(product); 
                }
            });
        });
    }

    render(data) {
        console.log('Rendering CarouselComponent with activeProductId:', this.activeProductId);
        this.parent.innerHTML = ''; 
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addClickHandlers(data);
    }
}