// uploadController.js
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const Post = require("../models/postModel"); // Import your PostModel
const User = require("../models/userModel");
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");

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
					const userId = req.user.id;
					const user = await User.findOne(userId);
					const { username } = user;

					const uploadDate = new Date();

					// Create a new post with the Cloudinary URL and additional information
					const newPost = new Post({
						// caption: req.body.caption,
						imageUrl: result.secure_url,
						userId,
						username,
						uploadDate,
					});

					// Save the post to the database
					await newPost.save();

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
					resource_type: "image", // Ensure the resource type is 'image'
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

		// Remove the profile picture URL
		user.profileUrl = "";
		await user.save();

		res.json({ message: "Profile picture deleted successfully" });
	} catch (error) {
		console.error("Error deleting profile picture:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	postsUpload,
	getAllPosts,
	uploadProfilePicture,
};
