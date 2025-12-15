const bcrypt = require("bcrypt");
const Account = require("../models/account.model");

exports.register = async (req, res) => {
    try{
        const {username, useremail, password, confirm} = req.body;
        if (!username) return res.send("กรุณากรอก username");
        if (!useremail) return res.send("กรุณากรอก Email");
        if (!password) return res.send("กรุณากรอก password");
        if (password != confirm) return res.send("password ไม่ตรงกัน");

        const exist = await Account.findByEmail(useremail);
        if (exist) {
            return res.send("อีเมลถูกใช้งานแล้ว");
        }

        const hash = await bcrypt.hash(password, 12);
        await Account.create({
            username,
            email: useremail,
            password: hash
        });

        return res.send("Register success!");
  } catch (err) {
        console.error(err);
        return res.send("เกิดข้อผิดพลาด");
    }
};

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body
        if(!username){
            return res.send("กรุณากรอก username");
        }else if(!password){
            return res.send("กรุณากรอก password");
        }

        const user = await Account.searchUser(username);
        if (!user) {
        return res.send("username หรือ password ไม่ถูกต้อง");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.send("username หรือ password ไม่ถูกต้อง");
        }

        req.session.isLoggedIn = true;
        req.session.userID = user.userID;

        return res.send("Login success!");
    }catch (err){
        console.error(err);
        return res.send("เกิดข้อผิดพลาด");
    }
}