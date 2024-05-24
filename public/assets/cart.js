function storeProduct(obj) {
    let products = localStorage.getItem("products");
    if (products == null) {
        products = {"items": []};
    } else {
        products = JSON.parse(products);
        products.items.push(obj);
    }

    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    let products = localStorage.getItem("products");
    if (products == null) {
        return [];
    }
    
    return JSON.parse(products).items;
}

function removeProduct(name) {
    let products = loadProducts().filter(p => p.name != name);
    localStorage.setItem("products", JSON.stringify({"items": products}));
}

function resetProducts() {
    localStorage.clear();
}

function updateProducts() {
    let cart = document.getElementById("cart-dropdown");
    cart.innerHTML = "";

    let products = loadProducts();
    let unique = [...new Set(products.map(JSON.stringify))].map(JSON.parse);
    for (let product of unique) {
        let amount = products.filter(p => p.name == product.name).length;

        let title = document.createElement("p");
        title.innerHTML = product.name;

        let image = document.createElement("img");
        image.src = product.image;

        let count = document.createElement("p");
        count.innerHTML = amount;

        let remove = document.createElement("button");
        remove.innerHTML = "Remove";
        remove.setAttribute("data-target", product.name);
        remove.addEventListener("click", (event) => {
            removeProduct(event.target.getAttribute("data-target"));
            updateProducts();
        });

        cart.appendChild(title);
        cart.appendChild(image);
        cart.appendChild(count);
        cart.appendChild(remove);
    }

    let total = document.createElement("p");
    total.innerHTML = `Total: ${products.reduce((a, b) => a + Number(b.price), 0)} kr.`;
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