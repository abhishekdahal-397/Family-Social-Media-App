// server/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Define user routes here
router.post("/postUsers", userController.createUser); // /api/users/postUsers
router.get("/getUsers", userController.getUsers); // /api/users/getUsers

module.exports = router;
