const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("form-login");
});

router.get("/form-login", (req, res) => {
  res.render("form-login");
});

router.get("/form-register", (req, res) => {
  res.render("form-register");
});

module.exports = router;
