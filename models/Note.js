// models/Note.js

// Import Mongoose
const mongoose = require("mongoose");

// Define the Note schema with fields for user, title, and content
const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the note
    title: { type: String, required: true }, // Title of the note
    content: { type: String, required: true }, // Body content of the note
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Note model
module.exports = mongoose.model("Note", NoteSchema);
