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

function removeCommentById(id) {
  return db
    .query(
      `
      SELECT * FROM comments WHERE comment_id = $1
    `,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment does not exist" });
      }
      return db.query(
        `
        DELETE FROM comments WHERE comment_id = $1
        `,
        [id]
      );
    });
}

module.exports = {
  fetchCommmentsByArticleId,
  insertComment,
  removeCommentById,
};
