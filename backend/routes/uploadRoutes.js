// server/routes/uploadRoutes.js
const express = require("express");

const {
	postsUpload,

	getAllPosts,
	uploadProfilePicture,
	updateProfilePicture,
} = require("../controllers/UploadController.js");

const router = express.Router();

// Define the route for file upload
router.post("/upload/:id", postsUpload); // localhost:3002/api/posts/upload/:id
router.get("/getposts", getAllPosts); // /api/posts/getposts
router.post("/uploadProfilePicture/:id", uploadProfilePicture); // localhost:3002/api/posts/uploadProfilePicture/:id
router.put("/updateProfilePicture/:id", updateProfilePicture);

module.exports = router;
