let mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  likes: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
});

let postModel = new mongoose.model("post", postSchema);

module.exports = postModel;
