const {
  fetchArticleById,
  fetchArticles,
} = require("../models/articles.models");

function getArticleById(request, response, next) {
  fetchArticleById(request.params.article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticles(request, response) {
  fetchArticles().then((articles) => {
    response.status(200).send({ articles });
  });
}

module.exports = { getArticleById, getArticles };
