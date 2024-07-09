const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Define user routes here
router.post("/register", userController.createUser); // /api/users/register
router.get("/getUsers", userController.getUsers); // /api/users/getUsers
router.post("/login", userController.loginUser); // /api/users/login
router.get("/getUser", verifyToken, userController.getUser); // /api/users/getUser/:id
router.get("/:id/profilepic", userController.getUserProfilePic); // /api/users/:id/profilePic
router.post("/logout/:id", verifyToken, userController.logoutUser);

module.exports = router;
