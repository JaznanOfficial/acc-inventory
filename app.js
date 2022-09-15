const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

// ------------------------------------------------------->

// product route

const productRoute = require('./routes/product.route')


app.use("/api/v1/product", productRoute);

module.exports = app;
