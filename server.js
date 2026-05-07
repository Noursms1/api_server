const express = require("express");
const app = express();

app.use(express.json());

// ✔ Home route (test)
app.get("/", (req, res) => {
  res.json({
    status: "API WORKING",
    message: "Server is running successfully"
  });
});

// ✔ Example: Product API
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    id: id,
    name: "Product " + id,
    price: 100 + parseInt(id),
    status: "active"
  });
});

// ✔ Search API example
app.get("/api/search", (req, res) => {
  const q = req.query.q || "";

  res.json({
    query: q,
    results: [
      { id: 1, title: "Result for " + q },
      { id: 2, title: "Another " + q }
    ]
  });
});

// ✔ IMPORTANT: Railway PORT FIX
const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log("API running on port " + port);
});
