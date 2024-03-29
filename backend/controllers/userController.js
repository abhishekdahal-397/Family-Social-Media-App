// server/controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Import your User model
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Check if any required field is missing
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Hash the password before saving

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();

    // Respond with success message and token

    res.status(201).json({ message: "User created successfully", token });
    console.log(username + " " + "logged in to family");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Add other controller methods as needed (e.g., getAllUsers, getUserById, etc.)
async function getUsers(req, res) {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, Password } = req.body;

    // Check if any required field is missing
    if (!email || !Password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: "Invalid email " });
    }
    // Temporary bypass for debugging
    // const isPasswordValid = true;
    console.log("length of hashed password : ", existingUser.password.length);

    console.log("Provided Password:", Password);
    console.log("Hashed Password from Database:", existingUser.password);

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      Password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid  password" });
    }
    console.log("Is Password Valid?", isPasswordValid);
    // // If the credentials are valid, generate a JWT token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Respond with success message and token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createUser,
  getUsers,
  loginUser,
};
