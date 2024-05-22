function store(obj) {
    let products = localStorage.getItem("products");
    if (products == null) {
        products = {"items": []};
    }

    products = JSON.parse(products);
    products.items.push(obj);
    localStorage.setItem("products", JSON.stringify(products));
}

function load() {
    let products = localStorage.getItem("products");
    if (products == null) {
        return;
    }
    
    return JSON.parse(products).items;
}

function remove(obj) {
    let products = localStorage.getItem("products");
    if (products == null) {
        return;
    }

    products = JSON.parse(products);
    products.items.splice(products.items.indexOf(obj), 1);
    localStorage.setItem("products", JSON.stringify(products));
}

function reset() {
    localStorage.clear();
}

document.getElementById("add-to-cart").addEventListener("click", () => {
    let product = {};
    product.name = document.getElementById("product-title").innerHTML;
    product.price = document.getElementById("product-price").innerHTML;
    product.image = document.getElementById("product-image").src;
    store(product);
})
