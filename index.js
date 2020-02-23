const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(formidableMiddleware());
app.use(cors());

const charactersRoute = require("./Routes/characters");
const comicsRoute = require("./Routes/comics");

app.use(charactersRoute);
app.use(comicsRoute);

mongoose.connect("mongodb://localhost/marvel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.get("/", (req, res) => {
    res.json("Welcome to Marvel API");
});

app.get("*", (req, res) => {
    res.json("Page not found");
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server Started");
})
