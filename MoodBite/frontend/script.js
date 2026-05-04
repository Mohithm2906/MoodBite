const API_URL = "https://moodbite-backend.onrender.com";

let cart = [];
let total = 0;
let currentMood = "";
let currentItems = [];

const foods = {
    Happy: [
        { name: "Cheese Burst Pizza", type: "Veg", price: 299, desc: "Celebration food", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
        { name: "Chocolate Waffle", type: "Veg", price: 149, desc: "Sweet dessert", img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400" },
        { name: "Loaded Fries", type: "Veg", price: 129, desc: "Crispy snack", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" }
    ],

    Tired: [
        { name: "Comfort Biryani Bowl", type: "Veg", price: 249, desc: "Warm filling meal", img: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
        { name: "Hot Coffee", type: "Drink", price: 129, desc: "Energy booster", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400" },
        { name: "Creamy Pasta", type: "Veg", price: 199, desc: "Soft relaxing meal", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400" }
    ],

    Spicy: [
        { name: "Peri Peri Burger", type: "Veg", price: 199, desc: "Spicy kick", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
        { name: "Fiery Momos", type: "Veg", price: 159, desc: "Hot street snack", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
        { name: "Chilli Garlic Noodles", type: "Veg", price: 189, desc: "Extra spicy noodles", img: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400" }
    ],

    Healthy: [
        { name: "Protein Salad Bowl", type: "Healthy", price: 179, desc: "Fresh healthy meal", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400" },
        { name: "Fruit Smoothie", type: "Drink", price: 119, desc: "Natural drink", img: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400" },
        { name: "Oats Banana Bowl", type: "Healthy", price: 139, desc: "Healthy breakfast", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400" },
        { name: "Green Juice", type: "Drink", price: 129, desc: "Detox drink", img: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400" }
    ],

    SouthIndian: [
        { name: "Idli Sambar", type: "Veg", price: 60, desc: "Soft idli with hot sambar", img: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?w=400" },
        { name: "Masala Dosa", type: "Veg", price: 120, desc: "Crispy dosa with potato masala", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" },
        { name: "Plain Dosa", type: "Veg", price: 90, desc: "Classic crispy dosa", img: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?w=400" },
        { name: "Medu Vada", type: "Veg", price: 70, desc: "Crispy South Indian snack", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400" },
        { name: "Onion Uttapam", type: "Veg", price: 110, desc: "Thick dosa with onion topping", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400" }
    ],

    NonVeg: [
        { name: "Chicken Biryani", type: "Non-Veg", price: 260, desc: "Spicy chicken rice", img: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400" },
        { name: "Chicken Burger", type: "Non-Veg", price: 199, desc: "Juicy chicken burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
        { name: "Fish Fry", type: "Non-Veg", price: 240, desc: "Crispy fried fish", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400" },
        { name: "Chicken Roll", type: "Non-Veg", price: 170, desc: "Street style chicken roll", img: "https://images.unsplash.com/photo-1604908176997-431ed2f10e2b?w=400" },
        { name: "Egg Fried Rice", type: "Non-Veg", price: 160, desc: "Rice with egg and spices", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400" }
    ]
};

function generateMoreItems() {
    const vegItems = ["Paneer Pizza", "Veg Burger", "Veg Sandwich", "Masala Pasta", "Veg Noodles", "Paneer Roll", "Cheese Dosa", "Ghee Idli"];
    const nonVegItems = ["Chicken Pizza", "Chicken Wings", "Egg Roll", "Fish Burger", "Chicken Pasta", "Mutton Biryani", "Chicken Noodles"];
    const healthyItems = ["Sprouts Bowl", "Quinoa Bowl", "Greek Yogurt", "Veg Soup", "Millet Bowl", "Fruit Bowl"];
    const images = [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400"
    ];

    for (let i = 1; i <= 200; i++) {
        let category;
        let baseName;
        let type;

        if (i % 3 === 0) {
            category = "NonVeg";
            baseName = nonVegItems[i % nonVegItems.length];
            type = "Non-Veg";
        } else if (i % 5 === 0) {
            category = "Healthy";
            baseName = healthyItems[i % healthyItems.length];
            type = "Healthy";
        } else {
            category = "Happy";
            baseName = vegItems[i % vegItems.length];
            type = "Veg";
        }

        foods[category].push({
            name: `${baseName} Special ${i}`,
            type: type,
            price: 80 + (i % 250),
            desc: "Special menu item",
            img: images[i % images.length]
        });
    }
}

generateMoreItems();

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Enter username and password");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("customerName", data.user);
            alert("Login successful");
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }
    } catch {
        alert("Backend not connected. Start backend first.");
    }
}

function showFood(category) {
    currentMood = category;
    currentItems = foods[category] || [];
    displayFoods(currentItems);
}

function filterFoods() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const type = document.getElementById("typeFilter").value;

    const filtered = currentItems.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search);
        const matchType = type === "All" || item.type === type;
        return matchSearch && matchType;
    });

    displayFoods(filtered);
}

function displayFoods(items) {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    if (items.length === 0) {
        menu.innerHTML = "<h3>No food found</h3>";
        return;
    }

    items.forEach(item => {
        menu.innerHTML += `
      <div class="card">
        <img src="${item.img}" class="food-img">
        <span class="food-type">${item.type}</span>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <h4>₹${item.price}</h4>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      </div>
    `;
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;

    document.getElementById("cartList").innerHTML += `<li>${name} - ₹${price}</li>`;
    document.getElementById("total").innerText = total;
}

async function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    const customerName = localStorage.getItem("customerName") || "Guest";

    const orderData = {
        customerName,
        items: cart,
        total,
        mood: currentMood
    };

    try {
        const response = await fetch(`${API_URL}/api/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        alert(data.message);

        cart = [];
        total = 0;
        document.getElementById("cartList").innerHTML = "";
        document.getElementById("total").innerText = "0";
    } catch {
        alert("Error placing order. Backend not connected.");
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/api/orders`);
        const orders = await response.json();

        const container = document.getElementById("ordersContainer");
        container.innerHTML = "";

        orders.reverse().forEach(order => {
            container.innerHTML += `
        <div class="order-card">
          <h3>Order #${order.id}</h3>
          <p><b>Customer:</b> ${order.customerName}</p>
          <p><b>Mood/Category:</b> ${order.mood}</p>
          <p><b>Total:</b> ₹${order.total}</p>
          <p><b>Status:</b> ${order.status}</p>
          <p><b>Time:</b> ${order.time}</p>
        </div>
      `;
        });
    } catch {
        console.log("Error loading orders");
    }
}