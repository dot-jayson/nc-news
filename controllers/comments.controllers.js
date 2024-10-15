
const { fetchArticleById } = require("../models/articles.models");
const { fetchCommmentsByArticleId } = require("../models/comments.models");

function getCommentsbyArticleId(request, response, next) {
  const { article_id } = request.params;
  const promises = [
    fetchCommmentsByArticleId(article_id),
    fetchArticleById(article_id),
  ];

  Promise.all(promises)
    .then((results) => {
      const comments = results[0];
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });

}

module.exports = { getCommentsbyArticleId };
