export class AddProductButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="text-center mt-4 mb-4">
                <button id="show-add-form-btn" class="btn btn-success">
                    <i class="bi bi-plus-circle me-2"></i>Добавить новый товар
                </button>
            </div>
        `;
    }

    addListeners(onClickHandler) {
        document.getElementById('show-add-form-btn').addEventListener('click', onClickHandler);
    }

    render(onClickHandler) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(onClickHandler);
    }
}