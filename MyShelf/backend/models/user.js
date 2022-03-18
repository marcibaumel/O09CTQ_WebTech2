const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String,  required: true },
  username: { type: String,  },
  added: { type: String,  default: new Date() },
});

module.exports = mongoose.model("user_elements", userSchema);
