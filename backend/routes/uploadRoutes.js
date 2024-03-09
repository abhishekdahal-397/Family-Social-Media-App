// server/routes/uploadRoutes.js
const express = require("express");

const { uploadController } = require("../controllers/UploadController.js");

const router = express.Router();

// Define the route for file upload
router.post("/", uploadController); // /api/upload

module.exports = router;
