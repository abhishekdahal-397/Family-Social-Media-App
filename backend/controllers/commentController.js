const Comment = require("../models/commentModel");

async function createComment(req, res) {
	try {
		const { content, postId, userId } = req.body;

		// Check if any required field is missing
		if (!content || !postId || !userId) {
			return res
				.status(400)
				.json({ error: "Content, postId, and userId are required" });
		}

		// Create a new comment
		const newComment = new Comment({
			content,
			postId,
			userId,
		});

		// Save the comment to the database
		await newComment.save();

		res
			.status(201)
			.json({ message: "Comment created successfully", comment: newComment });
	} catch (error) {
		console.error("Error creating comment:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function getAllComments(req, res) {
	try {
		// Fetch all comments from the database
		const comments = await Comment.find();

		// Respond with the list of comments
		res.status(200).json(comments);
	} catch (error) {
		console.error("Error fetching comments:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
//this is what i need
async function getCommentsByPostId(req, res) {
	try {
		const { postId } = req.params;
		if (!postId) {
			return res.status(400).json({ error: "Post ID is required" });
		}
		// Fetch comments for a specific post
		const comments = await Comment.find({ postId }).populate(
			"userId",
			"username profileUrl"
		);
		if (!comments || comments.length === 0) {
			return res
				.status(404)
				.json({ message: "No comments found for this post" });
		}
		res.status(200).json(comments);
	} catch (error) {
		console.error("Error fetching comments by post ID:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

// Add other controller methods as needed

module.exports = {
	createComment,
	getAllComments,
	getCommentsByPostId,
	// Add other exported controller methods here
};
