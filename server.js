const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

/* =========================
   WALLET CONFIG
========================= */
const wallets = JSON.parse(fs.readFileSync("./wallets.json", "utf8"));

const ADMIN_SECRET = "ADMIN_SECRET_123";

/* =========================
   DB FILES
========================= */
const USERS_FILE = "./users.json";
const PAYMENTS_FILE = "./payments.json";

function read(file){
    if(!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function write(file, data){
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/* =========================
   CREATE PAYMENT
========================= */
app.post("/api/payment/create", (req, res) => {

    const { apiKey, method, txid } = req.body;

    if(!apiKey) return res.json({ success:false, message:"API Key required" });

    const payments = read(PAYMENTS_FILE);

    const payment = {
        id: uuidv4(),
        apiKey,
        method: method || "manual",
        txid: txid || null,
        status: "pending",
        createdAt: new Date()
    };

    payments.push(payment);
    write(PAYMENTS_FILE, payments);

    console.log("New manual payment:", txid);

    res.json({
        success:true,
        paymentId: payment.id
    });
});

/* =========================
   GET PAYMENTS (ADMIN)
========================= */
app.get("/api/admin/payments", (req, res) => {

    const { secret } = req.query;

    if(secret !== ADMIN_SECRET){
        return res.json({ success:false, message:"Unauthorized" });
    }

    const payments = read(PAYMENTS_FILE);

    res.json({
        success:true,
        payments
    });
});

/* =========================
   APPROVE PAYMENT
========================= */
app.post("/api/admin/approve", (req, res) => {

    const { secret, paymentId } = req.body;

    if(secret !== ADMIN_SECRET){
        return res.json({ success:false, message:"Unauthorized" });
    }

    let payments = read(PAYMENTS_FILE);
    let users = read(USERS_FILE);

    const payment = payments.find(p => p.id === paymentId);

    if(!payment){
        return res.json({ success:false, message:"Payment not found" });
    }

    payment.status = "approved";

    let user = users.find(u => u.apiKey === payment.apiKey);

    if(user){
        user.plan = "pro";
    }

    write(PAYMENTS_FILE, payments);
    write(USERS_FILE, users);

    res.json({
        success:true,
        message:"User upgraded to PRO"
    });
});

/* =========================
   REJECT PAYMENT
========================= */
app.post("/api/admin/reject", (req, res) => {

    const { secret, paymentId } = req.body;

    if(secret !== ADMIN_SECRET){
        return res.json({ success:false, message:"Unauthorized" });
    }

    let payments = read(PAYMENTS_FILE);

    const payment = payments.find(p => p.id === paymentId);

    if(!payment){
        return res.json({ success:false, message:"Payment not found" });
    }

    payment.status = "rejected";

    write(PAYMENTS_FILE, payments);

    res.json({
        success:true,
        message:"Payment rejected"
    });
});

/* =========================
   GET WALLETS
========================= */
app.get("/api/wallets", (req, res) => {
    res.json(wallets);
});

/* =========================
   START
========================= */
server.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
