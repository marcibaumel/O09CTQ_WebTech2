const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const collectionElementRoute = require('./routes/collection-element')
const userRoute = require('./routes/user')
const app = express();

app.use(bodyParser.json());

/* app.use("/api", (req, res, next) => {

  res.status(200).json({
    message: "Get succesfully",
  });

}) */

//USE LOCAL MONGO_DB
mongoose
  .connect("mongodb://localhost:27017/webtech2_db")
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(() => {
    console.log("Connection failed");
  });


//CORS Settigns
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/collection", collectionElementRoute);
app.use("/api/user", userRoute);

module.exports = app;
