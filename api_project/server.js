const express = require("express");
const app = express();

app.use(express.json());

// endpoint أساسي
app.get("/", (req, res) => {
    res.json({ status: "API WORKING" });
});

// test endpoint
app.get("/test", (req, res) => {
    res.json({ message: "TEST OK" });
});

// مثال بيانات
app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Nour" },
        { id: 2, name: "Ali" }
    ]);
});

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("API running on http://127.0.0.1:" + PORT);
});
app.get("/search", (req, res) => {
    const q = req.query.q;

    const data = [
        "tiktok",
        "youtube",
        "instagram",
        "api system"
    ];

    const result = data.filter(item =>
        item.toLowerCase().includes(q?.toLowerCase() || "")
    );

    res.json(result);
});
