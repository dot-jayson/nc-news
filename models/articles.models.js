const db = require("../db/connection");

function fetchArticleById(id) {
  return db
    .query(
      `      
      SELECT 
        articles.author, 
        articles.title,
        articles.body,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id`,
      [id]
    )
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article does not exist" });
      }
      return article.rows[0];
    });
}

function fetchArticles(sort_by = "created_at", order = "desc", topic) {
  const validSortBys = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrders = ["asc", "desc"];

  if (!validSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (!validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  let queryValues = [];
  let queryString = `
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
  `;

  if (topic) {
    queryString += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryString += ` GROUP by articles.article_id ORDER BY ${sort_by} ${order}`;

  return db.query(queryString, queryValues).then((articles) => {
    if (articles.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
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
