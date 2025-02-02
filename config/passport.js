// config/passport.js

// Import necessary modules
const LocalStrategy = require("passport-local").Strategy; // Local authentication strategy
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Import the User model for checking credentials
const User = require("../models/User");

module.exports = function (passport) {
  // Configure the local strategy for Passport
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Find a user by email in the database
          const user = await User.findOne({ email: email });
          if (!user) {
            // No user found with that email
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          // Compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            // Passwords match, return the user
            return done(null, user);
          } else {
            // Password does not match
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (err) {
          // Pass any errors to Passport
          return done(err);
        }
      }
    )
  );

  // Serialize the user id to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user by finding them by id from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
