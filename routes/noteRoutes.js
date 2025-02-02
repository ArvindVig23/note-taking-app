// routes/noteRoutes.js

// Import required modules and middleware
const express = require("express");
const router = express.Router();
const Note = require("../models/Note"); // Note model
const { ensureAuthenticated } = require("../middleware/auth"); // Ensure routes are protected

// GET '/notes' - Retrieve and display all notes for the logged-in user
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    // Find all notes associated with the current user
    const notes = await Note.find({ user: req.user.id }).lean();
    res.render("notes", { user: req.user, notes }); // Render notes view
  } catch (err) {
    req.flash("error_msg", "Error retrieving notes");
    res.redirect("/dashboard");
  }
});

// POST '/notes/create' - Create a new note for the user
router.post("/create", ensureAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    req.flash("error_msg", "Title and content are required");
    return res.redirect("/notes");
  }
  try {
    // Create and save the new note with the user's ID
    const newNote = new Note({
      user: req.user.id,
      title,
      content,
    });
    await newNote.save();
    req.flash("success_msg", "Note created successfully");
    res.redirect("/notes");
  } catch (err) {
    req.flash("error_msg", "Error creating note");
    res.redirect("/notes");
  }
});

// GET '/notes/edit/:id' - Render the edit page for a specific note
router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    // Find the note by ID and ensure it belongs to the current user
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).lean();
    if (!note) {
      req.flash("error_msg", "Note not found");
      return res.redirect("/notes");
    }
    res.render("edit_note", { user: req.user, note });
  } catch (err) {
    req.flash("error_msg", "Error retrieving note");
    res.redirect("/notes");
  }
});

// POST '/notes/edit/:id' - Update the note with new data
router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  try {
    // Find the note and ensure it belongs to the user
    let note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      req.flash("error_msg", "Note not found");
      return res.redirect("/notes");
    }
    // Update note fields with new data
    note.title = title;
    note.content = content;
    await note.save();
    req.flash("success_msg", "Note updated successfully");
    res.redirect("/notes");
  } catch (err) {
    req.flash("error_msg", "Error updating note");
    res.redirect("/notes");
  }
});

// GET '/notes/delete/:id' - Delete a specific note
router.get("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    // Find and delete the note if it belongs to the current user
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    req.flash("success_msg", "Note deleted successfully");
    res.redirect("/notes");
  } catch (err) {
    req.flash("error_msg", "Error deleting note");
    res.redirect("/notes");
  }
});

// Export the router for use in server.js
module.exports = router;
