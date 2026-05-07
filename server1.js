const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

/*
=====================
  HEALTH CHECK
=====================
*/
app.get("/", (req, res) => {
    res.json({
        status: "API WORKING",
        time: new Date().toISOString()
    });
});

/*
=====================
  TEST ROUTE
=====================
*/
app.get("/test", (req, res) => {
    res.json({
        message: "TEST OK",
        success: true
    });
});

/*
=====================
  LOAD DATA (JSONL)
=====================
*/
function loadData() {
    try {
        const raw = fs.readFileSync("all_data.jsonl", "utf8");
        return raw
            .split("\n")
            .filter(Boolean)
            .map(line => JSON.parse(line));
    } catch (err) {
        return [];
    }
}

/*
=====================
  SEARCH API
=====================
*/
app.get("/search", (req, res) => {
    const q = (req.query.q || "").toLowerCase();

    if (!q) {
        return res.status(400).json({
            error: "Missing query parameter ?q="
        });
    }

    const data = loadData();

    const results = data.filter(item =>
        JSON.stringify(item).toLowerCase().includes(q)
    );

    res.json({
        query: q,
        count: results.length,
        results: results.slice(0, 20)
    });
});

/*
=====================
  START SERVER
=====================
*/
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API RUNNING http://0.0.0.0:${PORT}`);
});
