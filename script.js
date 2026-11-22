// =====================================
// BLOOME FLORIST - JAVASCRIPT
// =====================================

// PRODUCT DATA

const products = [
    {
        id: 1,
        name: "White Lily",
        category: "single",
        price: 45000,
        description: "Elegant white lily with a beautiful stem.",
        image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 2,
        name: "Pink Lily",
        category: "single",
        price: 45000,
        description: "Soft pink lily with graceful petals.",
        image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 3,
        name: "Red Rose",
        category: "single",
        price: 25000,
        description: "Classic red rose with a long stem.",
        image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 4,
        name: "Pink Tulip",
        category: "single",
        price: 30000,
        description: "Beautiful pink tulip flower.",
        image: "https://images.unsplash.com/photo-1528913775512-624d24b27b96?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 5,
        name: "Baby's Breath",
        category: "single",
        price: 35000,
        description: "Delicate little white flowers.",
        image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 6,
        name: "Sunflower",
        category: "single",
        price: 30000,
        description: "Bright and cheerful sunflower.",
        image: "https://images.unsplash.com/photo-1597848212624-e6cc9b9b4e9b?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 7,
        name: "Hydrangea",
        category: "single",
        price: 55000,
        description: "Beautiful blue hydrangea flower.",
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 8,
        name: "Pink Peony",
        category: "single",
        price: 60000,
        description: "Romantic pink peony with soft petals.",
        image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 9,
        name: "Pink Rose Bouquet",
        category: "bouquet",
        price: 125000,
        description: "Lovely pink roses arranged beautifully.",
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 10,
        name: "Pastel Bouquet",
        category: "bouquet",
        price: 175000,
        description: "A lovely mix of pastel flowers.",
        image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 11,
        name: "Sunflower Bouquet",
        category: "bouquet",
        price: 150000,
        description: "Cheerful sunflowers in a bouquet.",
        image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 12,
        name: "White Flower Bouquet",
        category: "bouquet",
        price: 180000,
        description: "Elegant bouquet of white flowers.",
        image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=700&q=85"
    }
];


// SHOPPING CART

let cart = [];


// DISPLAY PRODUCTS

function displayProducts(category = "all") {

    const container = document.getElementById("product-container");

    let filteredProducts = products;

    if (category !== "all") {
        filteredProducts = products.filter(
            product => product.category === category
        );
    }

    container.innerHTML = filteredProducts.map(product => `
        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/600x700/f8e9ec/98576b?text=Bloome+Florist';"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>${formatPrice(product.price)}</h4>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    + Add to Cart
                </button>

            </div>
        </div>
    `).join("");
}


// FORMAT PRICE

function formatPrice(price) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);

}


// FILTER PRODUCTS

function filterProducts(category, button) {

    document.querySelectorAll(".filter-buttons button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    displayProducts(category);

}


// ADD TO CART

function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    document.getElementById("cart-panel").classList.add("open");

    document.getElementById("overlay").classList.add("show");

}


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const totalCount = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = totalCount;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty ♡</p>";

    } else {

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-row">

                <span>
                    ${item.name} x ${item.quantity}
                    <br>
                    ${formatPrice(item.price * item.quantity)}
                </span>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `).join("");

    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("cart-total").textContent =
        formatPrice(total);

}


// REMOVE PRODUCT

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}


// OPEN AND CLOSE CART

function toggleCart() {

    document.getElementById("cart-panel").classList.toggle("open");

    document.getElementById("overlay").classList.toggle("show");

}


// MOBILE MENU

function toggleMenu() {

    document.getElementById("navbar").classList.toggle("show");

}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    const orderDetails = cart.map(item =>
        `${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`
    ).join("\n");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const message =
        "Hello Bloome Florist! I want to order:\n\n" +
        orderDetails +
        "\n\nTotal: " + formatPrice(total);

    // CHANGE THIS TO YOUR WHATSAPP NUMBER

    const phoneNumber = "62";

    const whatsappURL =
        "https://wa.me/" + 6281285358741 +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}


// INITIALIZE WEBSITE

displayProducts();
updateCart();