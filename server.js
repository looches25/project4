//DEPENDENCIES
require("dotenv").config();
const express = require("express");
// const session = require("express-session");
// const morgan = require("morgan");
const mongoose = require("mongoose");
// const debug = require("debug")
const path = require("path");
// const base = require('airtable').base('appvipAS3ThYCcIc3');
// const jwt = require ('jsonwebtoken')
// const verifyToken= require("./controllers/authController")

//? Experiment custom middleware
const TimeLogger = function (req, res, next) {
  req.TimeLogger = Date.now()
  next()
}
//CONTROLLERS
const userController = require("./controllers/userController");
const skuController = require("./controllers/skuController");
const posController = require("./controllers/posController");
// const airController = require("./controllers/airController");

//CONFIG
const app= express()
const PORT= process.env.PORT || 7000
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/proj4"
// const AIRTABLE_API_KEY= process.env.AIRTABLE_API_KEY

//CONFIG MONGODB
const db = mongoose.connection;
mongoose.connect(MONGO_URI);
db.on("error", (err) => console.log(err.message + " is mongodb not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGO_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//MIDDLEWARE
app.use(TimeLogger)
app.use(express.static("./client/dist"));
// app.use("/api/", express.static(path.join(__dirname, "./client/dist/index.html")))
app.use(express.json())
app.use("/api/users", userController);
app.use("/api/pos", posController);
app.use("/api/sku", skuController);
// app.use("/api/air", airController);


//ROUTES
//? Experiment
app.get("/api/test", (req,res)=> {
    let responseText = 'Hello World!<br>'
    responseText += `<small>Requested at: ${req.TimeLogger}</small>`
    res.send(responseText)
})

//? INDEX
app.get("/api/", (req,res)=> {
    res.send(fruits)
})

//? LOGIN
app.get("api/login", (req,res) => {
    res.send(users)
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
  });

//LISTENER
app.listen(PORT,()=> console.log(`Listening on Port ${PORT}`))