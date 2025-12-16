const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "programing_world"
});

const dbConnection = connection.promise();

dbConnection.connect()
  .then(() => console.log("DB connected"))
  .catch(err => console.error("DB connection error:", err));

module.exports = dbConnection;

