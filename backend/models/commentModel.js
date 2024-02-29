// server/models/commentModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
