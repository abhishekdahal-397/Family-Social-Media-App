// server/controllers/postController.js
const Post = require("../models/postModel");

async function createPost(req, res) {
  try {
    const { title, content, userId } = req.body;

    // Check if any required field is missing
    if (!title || !content || !userId) {
      return res
        .status(400)
        .json({ error: "Title, content, and userId are required" });
    }

    // Create a new post
    const newPost = new Post({
      title,
      content,
      userId,
    });

    // Save the post to the database
    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
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

// Add other controller methods as needed (e.g., getAllPosts, getPostById, etc.)
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

module.exports = {
  createPost,
  getAllPosts,
  // Add other exported controller methods here
};
