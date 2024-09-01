// server/routes/uploadRoutes.js
const express = require("express");

const {
	postsUpload,
	getAllPosts,
	uploadProfilePicture,
	updateProfilePicture,
	deleteProfilePicture,
	getUserUploads,
	getRandomFriendPosts,
} = require("../controllers/UploadController"); // Corrected the file name casing

const router = express.Router();

// Define the route for file upload
router.post("/upload/:id", postsUpload); // localhost:3002/api/posts/upload/:id
router.get("/getposts", getAllPosts); // /api/posts/getposts
router.post("/uploadProfilePicture/:id", uploadProfilePicture); // localhost:3002/api/posts/uploadProfilePicture/:id
router.put("/updateProfilePicture/:id", updateProfilePicture);
router.delete("/deleteProfilePicture/:id", deleteProfilePicture); // localhost:3002/api/posts/deleteProfilePicture/:id
router.get("/getUserPosts/:id", getUserUploads); // localhost:3002/api/posts/getUserPosts/:id
router.get("/getRandomFriendPosts/:id", getRandomFriendPosts);
module.exports = router;
