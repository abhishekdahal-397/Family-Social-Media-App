// server/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define user routes here
router.post("/register", userController.createUser); // /api/users/register
router.get("/getUsers", userController.getUsers); // /api/users/getUsers
router.post("/login", userController.loginUser); // http://localhost:3001/api/users/login
router.get("/getUser/:id", userController.getUser); // http://localhost:3001/api/users/getUser/:id
router.get("/:id/profilepic", userController.getUserProfilePic); //http://localhost:3001/api/users/:id/profilePic

module.exports = router;
