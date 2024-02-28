const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken module
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "your-secret-key"); // Replace 'your-secret-key' with your actual secret key
  return token;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
