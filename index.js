const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 3600 * 1000,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const ifNotLoggedin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/Go/form-login");
  }
  next();
};

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/process", authRoutes);
const pageRoutes = require("./routes/page.routes");
app.use("/Go", pageRoutes);

app.get("/", (req, res) => {
  res.redirect("/Go/form-login");
});

// Server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
