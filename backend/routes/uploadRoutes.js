// server/routes/uploadRoutes.js
const express = require("express");

const {
  uploadController,
  getAllPosts,
} = require("../controllers/UploadController.js");

const router = express.Router();

// Define the route for file upload
router.post("/upload", uploadController); // /api/posts/upload
router.get("/getposts", getAllPosts); // /api/posts/getposts

module.exports = router;
