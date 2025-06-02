export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" id="click-card-${data.id}" data-id="${data.id}" 
                     style="width: 232px; margin: 10px; height: 300px; display: flex; flex-direction: column; cursor: pointer;">
                    <div style="width: 100%; height: 168px; overflow: hidden; position: relative; background-color:rgb(255, 255, 255);">
                        <img class="card-img-top" src="${data.src}" alt="${data.title}" 
                             style="width: 100%; height: 100%; object-fit: contain; object-position: center;">
                    </div>  
                    <div class="card-body" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <h5 class="card-title">${data.title}</h5>
                        </div>
                        <div>
                            <p class="card-text" style="margin-bottom: 10px;">${data.text}</p>
                        </div>
                    </div>
                </div>
            `
        );
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }
}