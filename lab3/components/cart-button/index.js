export class CartButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <button id="cart-button" class="btn btn-primary" type="button" style="height: 40px; width: 100px;">В корзину</button>
            `
        );
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}