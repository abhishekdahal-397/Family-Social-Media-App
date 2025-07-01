// server/models/CommentModel.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: { type: String }, // Optional: cache username for quick rendering
	},
	{ timestamps: true } // Adds createdAt and updatedAt
);

const CommentModel = mongoose.model("Comment", commentSchema);
module.exports = CommentModel;
