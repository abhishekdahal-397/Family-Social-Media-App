// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Added this line to import the cors middleware

const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const uploadRoutes = require("./routes/uploadRoutes");
const friendRequestsRoutes = require("./routes/friendRequestRoutes");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allow all origins

// Routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", uploadRoutes);
app.use("/api", friendRequestsRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
