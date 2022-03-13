const mongoose = require("mongoose");

const collectionElementSchema = mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, default: "No content" },
  about: { type: String, default: "No content", required: true },
  added: { type: String,  default: new Date() },

  //creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("CollectionElements", collectionElementSchema);
