// server.js

// Load environment variables from the .env file
require("dotenv").config();

// Import required modules
const express = require("express"); // Framework for building the server
const mongoose = require("mongoose"); // ODM for MongoDB
const session = require("express-session"); // Session management
const flash = require("connect-flash"); // Flash messages for user feedback
const passport = require("passport"); // Authentication middleware
const path = require("path"); // For handling file paths

// Import Passport configuration (local strategy setup)
require("./config/passport")(passport);

// Create an Express application
const app = express();

// Connect to MongoDB Atlas using Mongoose. The connection string is in .env.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up EJS as the templating engine and define the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware: Parse incoming request bodies (URL-encoded and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up express-session for managing user sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Session secret from .env
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and let it manage authentication sessions
app.use(passport.initialize());
app.use(passport.session());

// Set up connect-flash to use flash messages for errors/success notifications
app.use(flash());

// Global middleware to make flash messages available in all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg"); // For success messages
  res.locals.error_msg = req.flash("error_msg"); // For error messages
  res.locals.error = req.flash("error"); // For Passport error messages
  next();
});

// Serve static assets (like CSS) from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Set up routes for the application
app.use("/", require("./routes/indexRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// Define the port (default to 5000 if not provided in .env)
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
