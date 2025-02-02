// routes/indexRoutes.js

// Import Express and create a router instance
const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth"); // Import authentication middleware

// GET '/' - Render the landing page
router.get("/", (req, res) => {
  res.render("index", { user: req.user }); // Pass the current user (if logged in) to the view
});

// GET '/dashboard' - Render the dashboard for authenticated users
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user }); // Only accessible if the user is authenticated
});

// Export the router to be used in server.js
module.exports = router;
