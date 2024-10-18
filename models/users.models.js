const db = require("../db/connection");

function fetchUsers() {
  return db
    .query(`SELECT username, name, avatar_url FROM users`)
    .then((users) => {
      return users.rows;
    });
}

function fetchUserByUsername(username) {
  return db
    .query(
      `SELECT
        users.username,
        users.name,
        users.avatar_url
      FROM users
      WHERE users.username = $1`,
      [username]
    )
    .then((user) => {
      if (user.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "User does not exist" });
      }
      return user.rows[0];
    });
}

module.exports = { fetchUsers, fetchUserByUsername };
