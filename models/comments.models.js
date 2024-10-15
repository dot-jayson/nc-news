const db = require("../db/connection");

function fetchCommmentsByArticleId(id) {
  return db
    .query(
      `
    SELECT 
      comments.comment_id,
      comments.votes,
      comments.created_at,
      comments.author,
      comments.body,
      comments.article_id
    FROM 
      comments
    WHERE
      comments.article_id = $1
    ORDER BY
      comments.created_at DESC;
    `,
      [id]
    )
    .then((comments) => {
      return comments.rows;
    });
}

function insertComment({ username, body }, id) {
  return db
    .query(
      `
    INSERT INTO 
      comments (author, body, article_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [username, body, id]
    )
    .then((result) => {
      return result.rows[0];
    });
}

module.exports = { fetchCommmentsByArticleId, insertComment };
