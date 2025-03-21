const express = require("express");
const passport = require("../config/passportConfig");
const bcrypt = require("bcryptjs");
const router = express.Router();
const pool = require("../config/db");

router.get("/", (req, res) => {
  res.send("welcome !!!");
});
//register users
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );
    res.json({ message: "User registered successfully", user: result.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
