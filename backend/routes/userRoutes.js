// server/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define user routes here
router.post("/register", userController.createUser); // /api/users/register
router.get("/getUsers", userController.getUsers); // /api/users/getUsers
router.post("/login", userController.loginUser); // /api/users/loginUser

module.exports = router;
