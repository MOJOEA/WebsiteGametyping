const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const dbConnection = require("./database");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 3600 * 1000
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

// middleware
app.use(express.urlencoded({ extended: false }));
// Declaring Custom Middleware
const ifNotLoggedin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.render("from-login");
  }
  next();
};

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
