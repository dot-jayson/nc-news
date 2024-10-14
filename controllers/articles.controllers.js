const { fetchArticleById } = require("../models/articles.models");

function getArticleById(request, response, next) {
  fetchArticleById(request.params.article_id)
    .then((article) => {
      response.status(200).send({ article: article.rows });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticleById };
