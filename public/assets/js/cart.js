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
    let totalPrice = 0;
    let products = loadProducts();

    let container = document.createElement("div");
    container.classList.add("flex", "flex-col");
    for (let [key, product] of products) {
        totalPrice += Number(product.price) * product.amount;

        let div = document.createElement("div");
        div.classList.add("relative");

        let image = document.createElement("img");
        image.src = product.image;
        image.setAttribute("alt", product.name);
        
        let title = document.createElement("p");
        title.innerHTML = `<b>${key}</b>`;

        let price = document.createElement("small");
        price.innerHTML = product.price + "kr";
        
        let amount = document.createElement("input");
        amount.type = "number";
        amount.value = product.amount;
        amount.classList.add("bg-gray-50", "border-2", "text-sm", "rounded-lg", "focus:ring-blue-500", "focus:border-blue-500", "block", "w-14", "h-6", "p-1");
        amount.setAttribute("data-target", product.name);
        amount.setAttribute("aria-label", "Amount of " + product.name);
        amount.setAttribute("title", "Amount of " + product.name);
        amount.addEventListener("change", (event) => {
            let product = loadProduct(event.target.getAttribute("data-target"));
            product.amount = event.target.value;
            storeProduct(product);
            updateProducts();
        });

        let remove = document.createElement("img");
        remove.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F9-93082_transparent-stop-sign-png-does-red-circle-with.png&f=1&nofb=1&ipt=120ae7219d909e98c9749453e54c53e235b7211207a4c605fd3c044f48c7db71&ipo=images";
        remove.classList.add("w-5", "h-5", "cursor-pointer", "hover:text-red-500", "hover:scale-110", "absolute", "top-1", "right-1");
        remove.setAttribute("data-target", product.name);
        remove.setAttribute("aria-label", "Remove " + product.name);
        remove.setAttribute("title", "Remove " + product.name);
        remove.addEventListener("click", (event) => {
            removeProduct(event.target.getAttribute("data-target"));
            updateProducts();
        });

        div.appendChild(remove);
        div.appendChild(image);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(amount);
        container.appendChild(div);
        container.appendChild(document.createElement("br"));
        
        let hr = document.createElement("hr");
        hr.classList.add("mb-2");
        container.appendChild(hr);
    }

    let cart = document.getElementById("cart-dropdown");
    cart.innerHTML = "";
    
    cart.appendChild(container);

    let div = document.createElement("div");
    div.classList.add("flex");

    let total = document.createElement("p");
    total.innerHTML = `<b>Total:</b> ${totalPrice} kr.`;
    total.classList.add("justify-start");

    let goToCheckout = document.createElement("a");
    goToCheckout.innerHTML = "Gå til betaling";
    goToCheckout.classList.add("underline", "hover:scale-105", "font-bold", "duration-50", "ml-auto", "cursor-pointer");

    div.appendChild(total);
    div.appendChild(goToCheckout);
    cart.appendChild(div);
}

try {
    document.getElementById("add-to-cart").addEventListener("click", () => {
        let product = {};
        product.name = document.getElementById("product-title").innerHTML;
        product.price = document.getElementById("product-price").innerHTML;
        product.image = document.getElementById("product-image").src;
        product.amount = 1;
        addProduct(product);
        
        updateProducts();
    })
} catch {}

document.addEventListener("DOMContentLoaded", () => {
    updateProducts();
})