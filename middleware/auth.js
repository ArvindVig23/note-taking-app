// middleware/auth.js

// Export middleware functions for route protection
module.exports = {
  // Check if the user is authenticated; if not, redirect them to the login page.
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated; proceed to the next middleware
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/auth/login"); // Not authenticated; redirect to login
  },
  // Redirect authenticated users away from pages like login or register.
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next(); // User is not authenticated; allow access
    }
    res.redirect("/dashboard"); // Already authenticated; redirect to dashboard
  },
};
