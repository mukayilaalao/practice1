const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Sample user database (Replace with a real database)
const users = [
  { id: 1, username: "test", password: bcrypt.hashSync("password", 10) },
];

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) return done(null, false, { message: "User not found" });

    // Compare hashed passwords
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  })
);

// Serialize & Deserialize user for session
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

module.exports = passport;
