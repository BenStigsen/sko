function store(obj) {
    let products = localStorage.getItem("products");
    if (products == null) {
        products = {"items": []};
    } else {
        products = JSON.parse(products);
        products.items.push(obj);
    }

    localStorage.setItem("products", JSON.stringify(products));
}

function load() {
    let products = localStorage.getItem("products");
    if (products == null) {
        return [];
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

function update() {
    let cart = document.getElementById("cart-dropdown");
    cart.innerHTML = "";

    let products = load();

    let unique = [...new Set(products.map(JSON.stringify))].map(JSON.parse);
    for (let product of products) {
        if (unique.find(p => p.name == product.name).count == undefined) {
            unique.find(p => p.name == product.name).count = 1;
        } else {
            unique.find(p => p.name == product.name).count += 1;
        }

    }

    for (let product of unique) {
        let title = document.createElement("p");
        title.innerHTML = product.name;

        let image = document.createElement("img");
        image.src = product.image;

        let count = document.createElement("p");
        count.innerHTML = product.count;
        cart.appendChild(title);
        cart.appendChild(image);
        cart.appendChild(count);
    }
}

document.getElementById("add-to-cart").addEventListener("click", () => {
    let product = {};
    product.name = document.getElementById("product-title").innerHTML;
    product.price = document.getElementById("product-price").innerHTML;
    product.image = document.getElementById("product-image").src;
    store(product);
    
    update();
})
