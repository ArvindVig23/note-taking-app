// models/User.js

// Import required modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema with fields: username, email, and password
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, // User's username
    email: { type: String, required: true, unique: true }, // Unique email address
    password: { type: String, required: true }, // Hashed password
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Pre-save hook to hash the user's password before saving to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new or changed
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password using the salt
    next();
  } catch (err) {
    next(err); // Pass any errors to the next middleware
  }
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
