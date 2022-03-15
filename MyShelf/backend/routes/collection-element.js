const collectionElement = require("../models/collection-element");
const express = require("express");

const router = express.Router();

//TEST THE ROUTE
router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Element get",
  });
});

//GET ALL ELEMENTS
router.get("", (req, res, next) => {
  collectionElement.find().then((documents) => {
    console.log(documents);
    return res.status(200).json({
      message: "Elements fetched succesfully",
      collectionElement: documents,
    });
  });
});

//ADD NEW ELEMENT
router.post("", (req, res, next) => {
  console.log("Ez itt a backend");

  const element = new collectionElement({
    title: req.body.title,
    platform: req.body.platform,
    about: req.body.about,
    added: req.body.added,
  });

  element
    .save()
    .then((createdElement) => {
      console.log("Element added " + element._id);
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
