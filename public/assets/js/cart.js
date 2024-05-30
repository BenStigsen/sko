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

    let container = $("<div>", { class: "flex flex-col"});  
    for (let [key, product] of products) {
        totalPrice += Number(product.price) * product.amount;

        let div =   $("<div>",   { class: "relative" });
        let image = $("<img>",   { src: product.image, alt: `Produkt ${product.name}` });
        let title = $("<p>",     { html: `<b>${key}</b>` });
        let price = $("<small>", { html: product.price + "kr" });
        
        let amount = $("<input>", {
            value: product.amount,
            type: "number",
            class: "bg-gray-50 border-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 h-6 p-1",
            title: `Amount of ${product.name}`,
            "aria-label": `Amount of ${product.name}`,
            "data-target": product.name
        });

        amount.on("change", (event) => {
            let product = loadProduct($(event.target).attr("data-target"));
            product.amount = event.target.value;
            storeProduct(product);
            updateProducts();
        })

        let remove = $("<img>", {
            src: "/assets/img/remove.png",
            alt: `Remove ${product.name}`,
            class: "w-5 h-5 max-sm:w-8 max-sm:h-8 cursor-pointer hover:text-red-500 hover:scale-110 absolute top-1 right-1",
            "data-target": product.name,
            "alt": `Remove ${product.name}`,
        });
        
        remove.on("click", (event) => {
            removeProduct($(event.target).attr("data-target"));
            updateProducts();
        });

        div.append([remove, image, title, price, amount]);
        container.append([div, $("<br>"), $("<hr>", { class: "mb-2"})]);
    }
    
    let div          = $("<div>", { class: "flex"});
    let total        = $("<p>", { html: `<b>Total:</b> ${totalPrice} kr.`, class: "justify-start"});
    let goToCheckout = $("<a>", { html: "Gå til betaling", class: "underline hover:scale-105 font-bold duration-50 ml-auto cursor-pointer"});
    
    div.append([total, goToCheckout]);
    $("#cart-dropdown").html(container).append(div);
}

$("#add-to-cart")?.on("click", () => {
    let product = {
        name: $("#product-title").text(),
        price: $("#product-price").text(),
        image: $("#product-image").attr("src"),
        amount: 1
    };

    addProduct(product);
    updateProducts();
});

try {
    updateProducts();
} catch (e) {
    console.log(e);
    resetProducts();
}
