export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 540px; border: none;">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <p class="card-text"><strong>Цена: ${data.price}</strong></p>
                    </div>
                </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}