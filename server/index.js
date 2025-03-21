const express = require("express");
const session = require("express-session");
const router = require("./routes/authRoutes");
const passport = require("./config/passportConfig");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const secret = process.env.SECRET;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(router);

app.listen(port, () => console.log(`Listening on ${port} ...`));
