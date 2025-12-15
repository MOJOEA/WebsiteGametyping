const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbConnection = require("../database");
const { body, validationResult } = require("express-validator");
//===============================================================================================================
router.post(
  "/register",
  [
    //---------------------------------------------------------------------------
    body("username").notEmpty().withMessage("กรอกชื่อผู้ใช้"),
    //---------------------------------------------------------------------------
    body("useremail").isEmail().withMessage("อีเมลไม่ถูกต้อง")
      .custom(async (value) => {
        const [rows] = await dbConnection.query(
          "SELECT email FROM account WHERE email = ?",[value]);

        if (rows.length > 0) { throw new Error("Email ถูกใช้งานแล้ว");}
        return true;
      }),
    //---------------------------------------------------------------------------
    body("password").isLength({ min: 6 }).withMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    //---------------------------------------------------------------------------
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("รหัสผ่านไม่ตรงกัน");
      return true;}),
    //---------------------------------------------------------------------------
  ],
  //===============================================================================================================
  async (req, res) => {
    const errors = validationResult(req);

    //---------------------------------------------------------------------------
    if (!errors.isEmpty()) {
      return res.send(errors.array()[0].msg);
    }
    //---------------------------------------------------------------------------
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      await dbConnection.query(
        `INSERT INTO account
        (userID, username, email, password, salt, role, images_account, login_count_account, lock_account, ban_account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [null, req.body.username, req.body.useremail, hashedPassword, '', 'member', 'default_images_account.jpg', 0, 0, 0]
      );

      return res.send("Register success!");
    //---------------------------------------------------------------------------
    } catch (err) {
      console.error(err);
      return res.send("เกิดข้อผิดพลาดระหว่างลงทะเบียน");
    }
    //---------------------------------------------------------------------------
  }
);    


module.exports = router;
