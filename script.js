const foods = {
    happy: [
        {
            name: "Cheese Burst Pizza",
            price: 299,
            desc: "Perfect for celebration mood"
        },
        {
            name: "Chocolate Waffle",
            price: 149,
            desc: "Sweet food for happy moments"
        },
        {
            name: "Loaded French Fries",
            price: 129,
            desc: "Crispy and fun snack"
        }
    ],

    tired: [
        {
            name: "Comfort Biryani Bowl",
            price: 249,
            desc: "Warm and filling meal"
        },
        {
            name: "Hot Coffee Combo",
            price: 129,
            desc: "Energy booster combo"
        },
        {
            name: "Creamy Pasta",
            price: 199,
            desc: "Soft and relaxing dinner"
        }
    ],

    spicy: [
        {
            name: "Peri Peri Burger",
            price: 199,
            desc: "For spicy food lovers"
        },
        {
            name: "Fiery Momos",
            price: 159,
            desc: "Hot and tasty street food"
        },
        {
            name: "Spicy Paneer Roll",
            price: 179,
            desc: "Indian spicy twist"
        }
    ],

    healthy: [
        {
            name: "Protein Salad",
            price: 179,
            desc: "Fresh and healthy meal"
        },
        {
            name: "Fruit Smoothie",
            price: 119,
            desc: "Natural energy drink"
        },
        {
            name: "Grilled Sandwich",
            price: 149,
            desc: "Light and tasty choice"
        }
    ]
};

let cart = [];
let total = 0;

function login() {
    const username = document.getElementById("username").value;

    if (username === "") {
        alert("Please enter your name");
    } else {
        alert("Welcome to MoodBite, " + username + "!");
        window.location.href = "index.html";
    }
}

function showFood(mood) {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    foods[mood].forEach(food => {
        menu.innerHTML += `
      <div class="card">
        <h3>${food.name}</h3>
        <p>${food.desc}</p>
        <h4>₹${food.price}</h4>
        <button onclick="addToCart('${food.name}', ${food.price})">
          Add to Cart
        </button>
      </div>
    `;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    const cartList = document.getElementById("cartList");
    cartList.innerHTML += `<li>${name} - ₹${price}</li>`;

    document.getElementById("total").innerText = total;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully!");
        cart = [];
        total = 0;
        document.getElementById("cartList").innerHTML = "";
        document.getElementById("total").innerText = "0";
    }
}