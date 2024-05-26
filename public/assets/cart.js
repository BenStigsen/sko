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

function addProduct(obj) {
    let products = loadProducts();
    obj.amount = products.has(obj.name) ? products.get(obj.name).amount + 1 : 1;
    products.set(obj.name, obj);
    storeMap(products);
}

function storeProduct(obj) {
    let products = loadProducts();
    if (obj.amount <= 0) {
        removeProduct(obj.name);
        return;
    }

    products.set(obj.name, obj);
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

        let div = document.createElement("div");
        div.classList.add("relative");

        let image = document.createElement("img");
        image.src = product.image;
        
        let title = document.createElement("p");
        title.innerHTML = key;

        let price = document.createElement("small");
        price.innerHTML = product.price + "kr";
        
        let amount = document.createElement("input");
        amount.type = "number";
        amount.value = product.amount;
        amount.classList.add("bg-gray-50", "border", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-14", "h-6", "p-1");
        amount.setAttribute("data-target", product.name);
        amount.addEventListener("change", (event) => {
            let product = loadProduct(event.target.getAttribute("data-target"));
            product.amount = event.target.value;
            storeProduct(product);
            updateProducts();
        });

        let remove = document.createElement("img");
        remove.src = "https://www.svgrepo.com/show/489107/remove-circle.svg";
        remove.classList.add("w-5", "h-5", "cursor-pointer", "hover:text-red-500", "hover:scale-110", "absolute", "top-1", "right-1");
        remove.setAttribute("data-target", product.name);
        remove.addEventListener("click", (event) => {
            removeProduct(event.target.getAttribute("data-target"));
            updateProducts();
        });

        div.appendChild(remove);
        div.appendChild(image);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(amount);
        cart.appendChild(div);
        cart.appendChild(document.createElement("br"));

        let hr = document.createElement("hr");
        hr.classList.add("mb-2");
        cart.appendChild(hr);
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
    product.amount = 1;
    addProduct(product);
    
    updateProducts();
})

document.addEventListener("DOMContentLoaded", () => {
    updateProducts();
})