// uploadController.js
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Post = require("../models/postModel"); // Import your PostModel
const User = require("../models/userModel");
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
const mongoose = require("mongoose");
const postsUpload = async (req, res) => {
	try {
		singleUpload(req, res, async (err) => {
			if (err) {
				return res
					.status(400)
					.json({ message: "Upload failed", error: err.message });
			}
			const image = req.file.buffer.toString("base64");
			cloudinary.uploader.upload(
				`data:image/png;base64,${image}`,
				async (error, result) => {
					if (error) {
						return res.status(500).json({
							message: "Cloudinary upload failed",
							error: error.message,
						});
					}

					// Extract user information from the request (modify based on your authentication setup)
					const userId = req.params.id;
					const user = await User.findOne({ _id: userId });
					const { username } = user;

					const uploadDate = new Date();

					// Create a new post with the Cloudinary URL and additional information
					const newPost = new Post({
						caption: req.body.caption,
						imageUrl: result.secure_url,
						userId,
						username,
						uploadDate,
					});

					// Save the post to the database
					await newPost.save();
					// Update the user's document to include the new post's ObjectId and URL
					user.posts.push(newPost._id); // Push the ObjectId of the new post
					user.postsUrl.push(result.secure_url); // Push the URL of the new post
					await user.save();
					// Handle the result or send a response to the client
					res.json({
						message: "File uploaded successfully!",
						cloudinaryDetails: result,
					});
				}
			);
		});
	} catch (error) {
		console.error("Error during file upload:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
const getUserUploads = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findOne({ _id: userId });

		// Check if the user exists
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Access postUrls directly as an array
		const posts = user.postsUrl;

		// Check if posts array is empty or doesn't exist
		if (!posts || posts.length === 0) {
			return res.status(404).json({ message: "User has no posts" });
		}

		// Return posts with status 200
		res.status(200).json(posts);
	} catch (error) {
		// Handle errors properly and return status 500
		res
			.status(500)
			.json({ message: "Something went wrong", error: error.message });
	}
};

const updateProfilePicture = async (req, res) => {
	try {
	} catch (error) {}
};

async function getAllPosts(req, res) {
	try {
		// Fetch all posts from the database
		const posts = await Post.find();

		// Respond with the list of posts
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

const uploadProfilePicture = async (req, res) => {
	try {
		singleUpload(req, res, async (err) => {
			if (err) {
				return res
					.status(400)
					.json({ message: "Upload failed", error: err.message });
			}
			const image = req.file.buffer.toString("base64");
			cloudinary.uploader.upload(
				`data:image/png;base64,${image}`,
				{
					folder: "userProfiles", // Specify the folder name
				},
				async (error, result) => {
					if (error) {
						console.log("error is ", error);
						return res.status(500).json({
							message: "Cloudinary upload failed",
							error: error.message,
						});
					}
					// Extract user ID from the request (modify based on your authentication setup)
					const userId = req.params.id;
					// Update the user's profile picture URL
					const user = await User.findById(userId);
					if (!user) {
						return res.status(404).json({ message: "User not found" });
					}
					user.profileUrl = result.secure_url;
					await user.save();

					// Handle the result or send a response to the client
					res.json({
						message: "Profile picture uploaded successfully!",
						cloudinaryDetails: result,
					});
				}
			);
		});
	} catch (error) {
		console.error("Error during file upload:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
const deleteProfilePicture = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// Optional: Delete the image from Cloudinary if needed
		if (user.profileUrl) {
			const publicId = user.profileUrl.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		// Remove the profile picture URL
		user.profileUrl = "";
		await user.save();

		res.json({ message: "Profile picture deleted successfully" });
	} catch (error) {
		console.error("Error deleting profile picture:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getRandomFriendPosts = async (req, res) => {
	const userId = req.params.id;

	try {
		const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
		if (!isValidObjectId) {
			return res.status(400).json({ message: "Invalid user ID" });
		}
		const objectId = new mongoose.Types.ObjectId(userId);

		const posts = await Post.aggregate([
			{
				$lookup: {
					from: "users", // Join with the User collection
					localField: "userId", // Post's userId
					foreignField: "_id", // User's _id
					as: "user", // New field to store user data
				},
			},
			{
				$unwind: "$user", // Deconstruct the user array
			},
			{
				$match: {
					"user.friends": objectId, // Match posts from friends of the user
				},
			},
			{
				$sample: { size: 10 }, // Get 10 random posts
			},
			{
				$project: {
					_id: 1,
					caption: 1,
					imageUrl: 1,
					uploadDate: 1,
					"user.username": 1,
					"user.profileUrl": 1,
				},
			},
		]);

		return res.json(posts); // Send the posts as a JSON response
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: "Failed to fetch posts", error: error.message });
	}
};
// Example function to add a like to a post
const addLike = async (req, res) => {
	const { postId, userId } = req.body;

	try {
		await Post.findByIdAndUpdate(
			postId,
			{ $addToSet: { likes: userId } }, // Add userId to likes array if it's not already present
			{ new: true } // Return the updated post
		);
		console.log("Post liked successfully!");
	} catch (error) {
		console.error("Error liking post:", error);
	}
};
// Example function to remove a like from a post
const removeLike = async (postId, userId) => {
	try {
		await Post.findByIdAndUpdate(
			postId,
			{ $pull: { likes: userId } }, // Remove userId from likes array
			{ new: true } // Return the updated post
		);
		console.log("Like removed successfully!");
	} catch (error) {
		console.error("Error removing like:", error);
	}
};

module.exports = {
	postsUpload,
	getAllPosts,
	getUserUploads,
	uploadProfilePicture,
	updateProfilePicture,
	deleteProfilePicture,
	getRandomFriendPosts,
	addLike,
	removeLike,
};
