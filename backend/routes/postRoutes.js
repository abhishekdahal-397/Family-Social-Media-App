// server/routes/postRoutes.js
const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

// Define post routes here
// router.get("/getPost", postController.getAllPosts);
router.post("/createpost", postController.createPost);
// ...

module.exports = router;
