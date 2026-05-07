const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ status: "API WORKING" });
});

app.get("/test", (req, res) => {
    res.json({ message: "OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("API RUNNING");
});
