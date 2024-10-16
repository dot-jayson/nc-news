const db = require("../db/connection");

function fetchUsers() {
  return db
    .query(`SELECT username, name, avatar_url FROM users`)
    .then((users) => {
      return users.rows;
    });
}

module.exports = { fetchUsers };
