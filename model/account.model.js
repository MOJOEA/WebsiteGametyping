const dbConnection = require("../database");

exports.findByEmail = async (email) => {
    const [user] = await dbConnection.query(
        "SELECT * FROM account WHERE email = ?",
        [email]
    );
  return user[0];
};

exports.searchUser = async (username) => {
    const [user] = await dbConnection.query(
        "SELECT * FROM account WHERE username = ?",
        [username]
    );
  return user[0];
};

exports.create = async (data) => {
    return dbConnection.query(
        `INSERT INTO account
        (userID, username, email, password, salt, role, images_account, login_count_account, lock_account, ban_account)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ null, data.username, data.email, data.password, "", "member", "default_images_account.jpg", 0, 0, 0]
  );
};