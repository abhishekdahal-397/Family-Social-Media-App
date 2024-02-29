// server/routes/commentRoutes.js
const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Define comment routes here
router.get("/getcomments", commentController.getAllComments); // /api/comments/getcomments
router.post("/postcomments", commentController.createComment); // /api/comments/postcomments
// ...

module.exports = router;
