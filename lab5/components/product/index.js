export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" style="width: 540px; border: none;">
                    <div style="width: 100%; padding-top: 56.25%; position: relative; overflow: hidden; background-color: #ffffff;">
                        <img src="${data.src}" class="card-img-top" alt="${data.title}" 
                             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; object-position: center;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <p class="card-text"><strong>Цена: ${data.text}</strong></p>
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