const mysql = require("mysql2");

// สร้าง connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "programing_world"
});

// แปลงเป็น promise เพื่อใช้ await
const dbConnection = connection.promise();

dbConnection.connect()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

module.exports = dbConnection;

