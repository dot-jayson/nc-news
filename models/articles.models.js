const db = require("../db/connection");

function fetchArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return article.rows[0];
    });
}

function fetchArticles() {
  return db
    .query(
      `
    SELECT 
      articles.author, 
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP by articles.article_id
    ORDER BY created_at DESC;
    `
    )
    .then((articles) => {
      return articles.rows;
    });
}

function updateArticleVotes(votes, id) {
  return db
    .query(
      `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
    `,
      [votes, id]
    )
    .then((updatedArticle) => {
      return updatedArticle.rows[0];
    });
}
module.exports = { fetchArticleById, fetchArticles, updateArticleVotes };
