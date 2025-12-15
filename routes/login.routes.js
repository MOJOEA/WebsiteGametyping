const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("กรอกชื่อผู้ใช้"),
    body("password").notEmpty().withMessage("กรอกรหัสผ่าน"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    const { username, password } = req.body;

    if (!errors.isEmpty()) {
      return res.send(errors.array()[0].msg);
    }

    try {
      const [rows] = await dbConnection.query(
        "SELECT * FROM account WHERE username = ?",
        [username]
      );

      if (rows.length === 0) {
        return res.send("ชื่อผู้ใช้หรือหัสผ่านไม่ถูกต้อง");
      }
      const user = rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.send("ชื่อผู้ใช้หรือหัสผ่านไม่ถูกต้อง");
      }

      req.session.isLoggedIn = true;
      req.session.userID = user.userID;

      res.send("Login success!");
    } catch (err) {
      console.error(err);
      return res.status(500).send("เกิดข้อผิดพลาด");
    }
  }
);

module.exports = router;
