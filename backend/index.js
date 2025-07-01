// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Added this line to import the cors middleware

const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();
const PORT = 3002;
require("dotenv").config();
const uploadRoutes = require("./routes/uploadRoutes");
const friendRequestsRoutes = require("./routes/friendRequestRoutes");
const connectDB = require("./config/db");
connectDB();
// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allow all origins
// Routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", uploadRoutes);

app.use("/api", friendRequestsRoutes);
// Start the server
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
