const express = require("express");

const collectionElement = require("../models/collection-element");
const router = express.Router();

router.get("/test", (req, res, next) => {
  return res.status(200).json({
    message: "Element get",
  });
});

router.get("", (req, res, next) => {
  collectionElement.find().then((documents) => {
    console.log(documents);
    return res.status(200).json({
      message: "Elements fetched succesfully",
      collectionElement: documents,
    });
  });
});

router.post("", (req, res, next) => {
  //const date = Data.now();
  const element = new collectionElement({
    title: req.body.title,
    platform: req.body.platform,
    about: req.body.about,
    //added: new Date(),
  });
  element.save().then((createdElement) => {
    console.log("Element added " + element._id);
    res.status(201).json({
      message: "Element added successfully!",
    });
  });
});

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

module.exports = router;
