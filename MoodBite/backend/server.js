const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const ORDER_FILE = "orders.json";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("MoodBite Backend is running");
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    res.json({
        message: "Login successful",
        user: username
    });
});

app.post("/api/order", (req, res) => {
    const { customerName, items, total, mood } = req.body;

    const newOrder = {
        id: Date.now(),
        customerName,
        mood,
        items,
        total,
        status: "Order Confirmed",
        time: new Date().toLocaleString()
    };

    const orders = JSON.parse(fs.readFileSync(ORDER_FILE));
    orders.push(newOrder);
    fs.writeFileSync(ORDER_FILE, JSON.stringify(orders, null, 2));

    setTimeout(() => updateStatus(newOrder.id, "Preparing"), 5000);
    setTimeout(() => updateStatus(newOrder.id, "Out for Delivery"), 10000);
    setTimeout(() => updateStatus(newOrder.id, "Delivered"), 15000);

    res.json({
        message: "Order placed successfully",
        order: newOrder
    });
});

app.get("/api/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ORDER_FILE));
    res.json(orders);
});

function updateStatus(orderId, newStatus) {
    const orders = JSON.parse(fs.readFileSync(ORDER_FILE));
    const index = orders.findIndex(order => order.id === orderId);

    if (index !== -1) {
        orders[index].status = newStatus;
        fs.writeFileSync(ORDER_FILE, JSON.stringify(orders, null, 2));
    }
}

app.listen(PORT, () => {
    console.log(`MoodBite backend running on http://localhost:${PORT}`);
});