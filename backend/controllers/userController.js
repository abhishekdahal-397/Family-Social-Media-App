//1:08:50
//Indian Coders
//MERN Stack: Advanced user Authentication and Authorisation | Mern Authentication & Authorization| Mern Authentication | MERN Stack Project
// server/controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Import your User model
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/authMiddleware");
const { z } = require("zod");
const { registrationSchema } = require("../validation/userValidation");
async function createUser(req, res) {
	try {
		// Extract user data from the request body
		const result = registrationSchema.parse(req.body);
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
			profileUrl:
				"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
		});

		await newUser.save();
		console.log("user created");

		// Generate JWT token
		const token = newUser.generateAuthToken();

		// Respond with success message and token

		res.status(201).json({ message: "User created successfully", token });
		console.log(username + " " + "logged in to family");
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("something zod error");
			res.status(400).json({ errors: error.errors });
		} else {
			console.error("Error creating user:", error);
			res.status(500).json(error);
		}
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
		const { email, password } = req.body;
		console.log(`${email} is trying to log in `);
		console.log("email and password ", email, password);

		if (!email || !password) {
			console.log("returned with invalid email or password ");
			return res.status(400).json({ error: "Email and password are required" });
		}

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			console.log("no existing user ");

			return res.status(401).json({ error: "Invalid email " });
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			existingUser.password
		);

		isPasswordValid && console.log("password is valid ");
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid password" });
		}

		const token = jwt.sign(
			{ userId: existingUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);
		token && console.log("token signed again ");
		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				_id: existingUser._id,
				username: existingUser.username,
				profileUrl: existingUser.profileUrl,
			},
		});
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}

const getUserProfilePic = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ profilePicture: user.profileUrl });
	} catch (error) {
		console.error("Error fetching user profile picture:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

async function getUser(req, res) {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ user });
	} catch (err) {
		return res
			.status(500)
			.json({ error: "Server error", details: err.message });
	}
}
async function logoutUser(req, res) {
	try {
		// If using sessions, destroy the session
		req.session.destroy((err) => {
			if (err) {
				return res.status(500).send({ message: "Logout failed" });
			}
		});

		// Clear JWT cookie if you are using JWT stored in cookies
		res.clearCookie("authToken");

		// Send success response
		return res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		console.error("Error logging out:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}

async function getUserFriends(req, res) {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "user not found" });
		}
		return res.status(200).json(user.friends);
	} catch (error) {
		return new Error(error);
	}
}

module.exports = {
	createUser,
	getUsers,
	loginUser,
	getUser,
	getUserProfilePic,
	verifyToken,
	logoutUser,
	getUserFriends,
};
