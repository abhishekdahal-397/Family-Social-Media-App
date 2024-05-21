// server/routes/uploadRoutes.js
const express = require("express");

const {
	uploadController,
	getAllPosts,
	uploadProfilePicture,
} = require("../controllers/UploadController.js");

const router = express.Router();

// Define the route for file upload
router.post("/upload", uploadController); // localhost:3001/api/posts/upload
router.get("/getposts", getAllPosts); // /api/posts/getposts
router.post("/uploadProfilePicture/:id", uploadProfilePicture); // localhost:3001/api/posts/uploadProfilePicture/:id
module.exports = router;
