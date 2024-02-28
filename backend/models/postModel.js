// server/models/postModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // Add more fields as needed
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
