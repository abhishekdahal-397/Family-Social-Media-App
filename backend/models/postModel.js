// server/models/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	caption: { type: String },
	imageUrl: { type: String, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	uploadDate: { type: Date, default: Date.now },
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Array of user IDs who liked the post
});
const PostModel = mongoose.model("Post", postSchema); // Use "Post" as the model name
module.exports = PostModel;
