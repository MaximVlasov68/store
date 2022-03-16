class Product {
    name;
    price;
    quantity;
    weight;
    image;

    constructor(name, price, quantity, weight, image) {
        this.name = name;
        this.price = parseInt(price);
        this.quantity = parseFloat(quantity);
        this.weight = parseFloat(weight);
        this.image = image;
    }

    get cost() {
        return this.price * this.quantity
    }

    get totalWeight() {
        return this.weight * this.quantity
    }

    toJSON() {
        return JSON.stringify({
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            weight: this.weight,
            cost: this.cost,
            totalWeight: this.totalWeight,
            image: this.image,
        })
    }

    static from(str) {
        const { name, price, quantity, weight, image } = JSON.parse(str);
        return new Product(name, price, quantity, weight, image)
    }
}

class Cart {

    static STORAGE_KEY = 'cart';

    products = [];

    constructor(products) {
        this.products = products ?? [];
    }

    toJSON() {
        return JSON.stringify(
            this.products.map(product => product.toJSON())
        )
    }

    static load() {
        const data = localStorage.getItem(Cart.STORAGE_KEY);
        return Cart.from(data);
    }

    static from(data) {
        return new Cart(
            JSON.parse(data)?.map(el => Product.from(el))
        );
    }

    save() {
        localStorage.setItem(Cart.STORAGE_KEY, this.toJSON())
        console.log(`Saved ${this.toJSON()}`);
    }

    add(product) {
        if (product instanceof Product) {
            this.products.push(product)
            this.save()
            console.log(`Added product ${product.toJSON()}`);
        } else throw new TypeError('Argument is not of Product class')
    }
}


const cart = Cart.load();
console.log(`Loaded cart ${cart.toJSON()}`);
const orderSubmitButton = document.querySelector('.forming');

if (orderSubmitButton) {
    orderSubmitButton.onclick = function (event) {
        console.log(`Submit order`);

    }
}

const addProductButton = document.querySelector('.addBusket');

if (addProductButton) {
    addProductButton.onclick = function (event) {
        const name = document.querySelector('#name').innerHTML;
        const price = document.querySelector('#priceNumber').innerHTML;
        const quantity = document.querySelector('#quantity').innerHTML;
        const weight = document.querySelector('#weight').innerHTML;
        const image = document.querySelector('#image').dataset.src;
        const product = new Product(name, price, quantity, weight, image);
        cart.add(product);
    }
}

const cartItemView = document.querySelector('script#cart-item');
if (cartItemView) {
    const template = Handlebars.compile(cartItemView.innerHTML);
    const data = {
        products: cart.products
    };
    const html = template(data);
    document.querySelector('.box-cart').insertAdjacentHTML('beforeend', html);
}
