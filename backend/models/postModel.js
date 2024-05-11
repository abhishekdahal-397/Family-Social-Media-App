// server/models/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: { type: String, ref: "User" },
  imageUrl: { type: String, required: true, ref: "User" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  uploadDate: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", postSchema); // Use "Post" as the model name

module.exports = PostModel;
