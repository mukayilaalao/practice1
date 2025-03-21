const express = require("express");
const passport = require("../config/passportConfig");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome !!!");
});

// Login Route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// Protected Route (Requires Authentication)
router.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  res.send(`Welcome, ${req.user.username}!`);
});

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

module.exports = router;
