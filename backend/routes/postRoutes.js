// server/routes/postRoutes.js
const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

// Define post routes here
router.get("/getallpost", postController.getAllPosts); // api/posts/getPost
router.post("/createpost", postController.createPost); // /api/posts/createpost
// ...

module.exports = router;
