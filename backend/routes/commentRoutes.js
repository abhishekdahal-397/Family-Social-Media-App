// server/routes/commentRoutes.js
const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();
// Define comment routes here
router.get("/getcomments", commentController.getAllComments); // localhost:3002/api/comments/getcomments
router.post("/postcomments", commentController.createComment); // http://localhost:3002/api/comments/postcomments

router.get("/getcomments/:postId", commentController.getCommentsByPostId); // http://localhost:3002/api/comments/getcomments/:postId

module.exports = router;
