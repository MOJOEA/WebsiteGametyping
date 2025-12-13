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

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ใช้ routes
const pageRoutes = require("./routes/page.routes");
app.use("/", pageRoutes);


// middleware
app.use(express.urlencoded({ extended: false }));
// Declaring Custom Middleware
const ifNotLoggedin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.render("form-login");
  }
  next();
};

// route page
app.get('/', ifNotLoggedin, (req, res, next) => {
  dbConnection.execute("SELECT name FROM users WHERE id = ?", [req.session.userID])
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
