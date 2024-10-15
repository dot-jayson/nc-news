const db = require("../db/connection");

function fetchCommmentsByArticleId(id) {
  return db.query(`query here`, [id]).then((comments) => {
    return comments.rows;
  });
}

module.exports = { fetchCommmentsByArticleId };
