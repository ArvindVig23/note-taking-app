// routes/authRoutes.js

// Import necessary modules and middleware
const express = require("express");
const router = express.Router();
const passport = require("passport"); // For authentication
const User = require("../models/User"); // User model
const { forwardAuthenticated } = require("../middleware/auth"); // Middleware to restrict access if already authenticated

// GET '/auth/register' - Render the registration page
router.get("/register", forwardAuthenticated, (req, res) => {
  res.render("register"); // Render the registration view
});

// POST '/auth/register' - Process registration form data
router.post("/register", async (req, res) => {
  // Extract fields from the registration form
  const { username, email, password, password2 } = req.body;
  let errors = []; // Array to hold any validation error messages

  // Validate required fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }
  // Validate that passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  // Validate password length
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // If validation fails, re-render the register page with errors
  if (errors.length > 0) {
    res.render("register", { errors, username, email, password, password2 });
  } else {
    try {
      // Check if the email is already registered
      const user = await User.findOne({ email: email });
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          username,
          email,
          password,
          password2,
        });
      } else {
        // Create a new user and save to the database
        const newUser = new User({ username, email, password });
        await newUser.save();
        req.flash("success_msg", "You are now registered and can log in"); // Set a success message
        res.redirect("/auth/login"); // Redirect to the login page
      }
    } catch (err) {
      console.error(err);
      res.render("register", { errors: [{ msg: "Server error" }] });
    }
  }
});

// GET '/auth/login' - Render the login page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login"); // Render the login view
});

// POST '/auth/login' - Process login using Passport's local strategy
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard", // On success, go to the dashboard
    failureRedirect: "/auth/login", // On failure, return to login page
    failureFlash: true, // Enable flash messages for login errors
  })(req, res, next);
});

// GET '/auth/logout' - Logout the user and end the session
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out"); // Flash a logout message
    res.redirect("/auth/login"); // Redirect to the login page
  });
});

// Export the router for use in server.js
module.exports = router;
