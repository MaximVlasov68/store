class Product {
    id;
    name;
    price;
    quantity;
    weight;
    image;
    checked;

    constructor(id, name, price, quantity, weight, image, checked) {
        this.id = id;
        this.name = name;
        this.price = parseInt(price);
        this.quantity = parseFloat(quantity);
        this.weight = parseFloat(weight);
        this.image = image;
        this.checked = checked;
    }

    get cost() {
        return this.price * this.quantity
    }

    get totalWeight() {
        return this.weight * this.quantity
    }

    toJSON() {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            weight: this.weight,
            cost: this.cost,
            totalWeight: this.totalWeight,
            image: this.image,
            checked: this.checked,
        })
    }

    static from(str) {
        const { id, name, price, quantity, weight, image, checked } = JSON.parse(str);
        return new Product(id, name, price, quantity, weight, image, checked)
    }
}

class ProductAlreadyInCartError extends Error {
    constructor(product) {
        super();
        this.message = `Product ${product.toJSON()} is already in cart`;
        this.name = 'ProductAlreadyInCartError';
    }
}


class Cart {

    static STORAGE_KEY = 'cart';

    products = [];

    constructor(products) {
        this.products = products ?? [];
    }

    get totalCostWithDiscount() {
        const cost = this.totalCost;
        let discount = 0;
        if (cost >= 5000) {
            discount = 0.05;
        }
        if (cost >= 10000) {
            discount = 0.1;
        }
        return cost - cost * discount;
    }

    get totalCost() {
        return this.products.filter(product => product.checked === true).reduce((sum, product) => sum + product.cost, 0)
    }

    get totalWeight() {
        return this.products.filter(product => product.checked === true).reduce((sum, product) => sum + product.weight, 0)
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
            if (this.getProductById(product.id)) {
                throw new ProductAlreadyInCartError(product)
            }
            this.products.push(product)
            this.save()
            console.log(`Added product ${product.toJSON()}`);
        } else throw new TypeError('Argument is not of Product class')
    }

    delete(productId) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId)
    }

    increaseQuantity(productId) {
        const product = this.getProductById(productId)
        if (product.quantity < 20) {
            product.quantity = product.quantity + 1;
        }
    }

    decreaseQuantity(productId) {
        const product = this.getProductById(productId)
        if (product.quantity > 1) {
            product.quantity = product.quantity - 1;
        }
    }

    setChecked(productId, value) {
        const product = this.getProductById(productId)
        product.checked = value;
    }

    render() {
        const cartView = document.querySelector('script#cart');
        if (cartView) {
            const template = Handlebars.compile(cartView.innerHTML);
            const data = {
                products: this.products,
                cart: {
                    totalCost: this.totalCost,
                    totalCostWithDiscount: this.totalCostWithDiscount,
                    totalWeight: this.totalWeight,
                }
            };
            const html = template(data, { allowProtoPropertiesByDefault: true }); /* пазрешить использовать геттеры */
            const root = document.querySelector('.box-cart');
            root.innerHTML = html;
        }


        /* select checkbox */
        const checkbox = document.querySelector('#select');
        const allCheckboxes = document.querySelectorAll('.check');
        /* console.log(allCheckbox); */
        if (checkbox && allCheckboxes) {
            checkbox.onclick = function () {
                if (checkbox.checked) {
                    allCheckboxes.forEach(el => el.checked = true);
                }
                else {
                    allCheckboxes.forEach(el => el.checked = false);
                }
            }
        }
        allCheckboxes.forEach(checkbox =>
            checkbox.addEventListener('change', event => {
                const value = event.target.checked;
                const parentItemElement = event.target.closest('.cart-item');
                const productId = parentItemElement.dataset.id;
                cart.setChecked(productId, value)
                cart.save()
                cart.render()
            })
        )

        const plusButtons = document.querySelectorAll('.buttonCountPlus');
        const minusButtons = document.querySelectorAll('.buttonCountMinus');
        plusButtons.forEach(button =>
            button.addEventListener('click', event => {
                const parentItemElement = event.target.closest('.cart-item');
                const productId = parentItemElement.dataset.id;
                cart.increaseQuantity(productId);
                cart.save();
                cart.render();
            })
        )
        minusButtons.forEach(button =>
            button.addEventListener('click', event => {
                const parentItemElement = event.target.closest('.cart-item');
                const productId = parentItemElement.dataset.id;
                cart.decreaseQuantity(productId);
                cart.save();
                cart.render();
            })
        )

        const deleteItemsButton = document.querySelector('.deleteItem')
        if (deleteItemsButton) {
            deleteItemsButton.onclick = () => {
                const itemsForDelete = Array.from(document.querySelectorAll('.cart-item')).filter(el => el.querySelector('.check').checked === true)
                itemsForDelete.forEach(item => cart.delete(item.dataset.id))
                cart.save()
                cart.render()
            }
        }

        /* увеличение поля ввода */
        const inputAdress = document.querySelector('.inputAdress');  

        if (inputAdress) {
            inputAdress.oninput = function () {
                let contentLength = inputAdress.value.length;
                let size = contentLength > 0 ? contentLength + 5 + "ch" : "";
                inputAdress.style.width = size;
                inputAdress.style.transition = "none";
            }
        }
        /* выпадение уточнения адреса */
        const selectDelivery = document.querySelector('#delivery');
        const selectPickup = document.querySelector('#pickup');
        const deliveryBox = document.querySelector('.adress-box');

        if (selectDelivery && selectPickup) {
            selectDelivery.onclick = function () {
                if (selectDelivery.checked = true) {
                    deliveryBox.style.display = "block";
                    deliveryBox.style.animation = "upToDown .8s forwards";
                    console.log('look block');
                }
            }

            selectPickup.onclick = function () {
                if (selectPickup.checked = true) {
                    deliveryBox.style.animation = "downToUp .8s forwards";
                    console.log('block none');
                }
                /* deliveryBox.style.display = "none"; */
            }
        }
    }
}

let cart;
document.addEventListener('DOMContentLoaded', e => {

    cart = Cart.load();
    console.log(`Loaded cart ${cart.toJSON()}`);
    cart.render();

    const orderSubmitButton = document.querySelector('.forming');

    if (orderSubmitButton) {
        orderSubmitButton.onclick = function (event) {
            console.log(`Submit order`);

        }
    }

    const addProductButton = document.querySelector('.addBusket');

    if (addProductButton) {
        addProductButton.onclick = function (event) {
            const id = document.querySelector('#id').innerHTML;
            const name = document.querySelector('#name').innerHTML;
            const price = document.querySelector('#priceNumber').innerHTML;
            const quantity = document.querySelector('#quantity').innerHTML;
            const weight = document.querySelector('#weight').innerHTML;
            const image = document.querySelector('#image').dataset.src;
            const checked = true;
            const product = new Product(id, name, price, quantity, weight, image, checked);
            cart.add(product);
        }
    }
})
