const db = require("../db/connection");

function fetchArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return article.rows;
    });
}

module.exports = { fetchArticleById };
