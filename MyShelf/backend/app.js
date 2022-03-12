const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const collectionElementRoute = require('./routes/collection-element')

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log("test")
})

mongoose
  .connect("mongodb://localhost:27017/webtech2_db")
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(() => {
    console.log("Connection failed");
  });

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

app.use("/api/elements", collectionElementRoute);

module.exports = app;
