const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("login logic here");
});

const ifLoggedin = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/home");
  }
  next();
};



module.exports = router;
