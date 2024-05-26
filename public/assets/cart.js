/* CONCEPT CODE
    This is to simulate the behaviour of a shopping cart, with the following features:
        - Add to cart
        - Remove from cart
        - Reset cart
        - Change amount of product <x> in cart

    This is not supposed to be used in production, but only to show the expected production behaviour.
*/

function storeMap(map) {
    localStorage.products = JSON.stringify([...map]);
}

function storeProduct(obj) {
    let products = loadProducts();

    let product = products.get(obj.name) ?? obj;
    product.amount = product.amount ? product.amount + 1 : 1;

    products.set(product.name, product);
    storeMap(products);
}

function loadProducts() {
    let products = localStorage.products ?? '""';
    return new Map(JSON.parse(products));
}

function loadProduct(name) {
    return loadProducts().get(name);
}

function removeProduct(name) {
    let products = loadProducts();
    products.delete(name);
    storeMap(products);
}

function resetProducts() {
    localStorage.clear();
}

function updateProducts() {
    let cart = document.getElementById("cart-dropdown");
    cart.innerHTML = "";

    let totalPrice = 0;
    let products = loadProducts();
    for (let [key, product] of products) {
        totalPrice += Number(product.price) * product.amount;

        let title = document.createElement("p");
        title.innerHTML = key;

        let image = document.createElement("img");
        image.src = product.image;

        let amount = document.createElement("input");
        amount.type = "number";
        amount.value = product.amount;
        amount.setAttribute("data-target", product.name);
        amount.addEventListener("change", (event) => {
            loadProduct(event.target.getAttribute("data-target")).amount = event.target.value;
            updateProducts();
        });

        let remove = document.createElement("a");
        remove.innerHTML = "Remove";
        remove.setAttribute("data-target", product.name);
        remove.addEventListener("click", (event) => {
            removeProduct(event.target.getAttribute("data-target"));
            updateProducts();
        });

        cart.appendChild(title);
        cart.appendChild(image);
        cart.appendChild(amount);
        cart.appendChild(remove);
    }

    let total = document.createElement("p");
    total.innerHTML = `Total: ${totalPrice} kr.`;
    cart.appendChild(total);
}

document.getElementById("add-to-cart").addEventListener("click", () => {
    let product = {};
    product.name = document.getElementById("product-title").innerHTML;
    product.price = document.getElementById("product-price").innerHTML;
    product.image = document.getElementById("product-image").src;
    storeProduct(product);
    
    updateProducts();
})

document.addEventListener("DOMContentLoaded", () => {
    updateProducts();
})