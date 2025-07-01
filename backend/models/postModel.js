// server/models/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		caption: { type: String },
		imageUrl: { type: String, required: true },
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		postBy: { type: String }, // Optional: store username
		uploadDate: { type: Date, default: Date.now },
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
		comments: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] },
		], // Add comment references
	},
	{ timestamps: true } // Adds createdAt and updatedAt
);

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;
