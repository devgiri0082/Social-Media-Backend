let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  followers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    unique: false,
    required: false,
    default: [],
  },
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    unique: false,
    required: false,
    default: [],
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    unique: false,
    required: false,
    default: [],
  },
});

let userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
