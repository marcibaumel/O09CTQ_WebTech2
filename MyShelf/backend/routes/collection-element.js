const collectionElement = require("../models/collection-element");
const checkAuth = require("../middleware/check-auth");
var ObjectId = require('mongodb').ObjectID;
const express = require("express");

const router = express.Router();

//TEST THE ROUTE
router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Element get",
  });
});

//GET ALL ELEMENTS
router.get("", checkAuth, (req, res, next) => {
  collectionElement
    .find({
      "creator": ObjectId(req.userData.userId)
    })
    .then((documents) => {
      console.log(documents);
      return res.status(200).json({
        message: "Elements fetched succesfully",
        collectionElement: documents
      });
    });
});

//ADD NEW ELEMENT
router.post("", checkAuth, (req, res, next) => {
  console.log("Ez itt a backend");
  //console.log(req.userData.userId);
  const element = new collectionElement({
    title: req.body.title,
    platform: req.body.platform,
    about: req.body.about,
    added: req.body.added,
    creator: req.userData.userId,
  });

  element
    .save()
    .then((createdElement) => {
      //console.log("Element added " + element._id);
      res.status(201).json({
        message: "Element added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something wrong with the backend!",
      });
    });
});

//DELETE AN ELEMENT
router.delete("/:id", (req, res, next) => {
  console.log("Delete has started");
  collectionElement.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Delete successful!" });
    } else {
      res.status(401).json({ message: "No delete!" });
    }
  });
});

//EXPORTS
module.exports = router;
