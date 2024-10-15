const {
  fetchArticleById,
  fetchArticles,
  updateArticleVotes,
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

function patchArticle(request, response) {
  const { inc_votes } = request.body;
  const { article_id } = request.params;
  updateArticleVotes(inc_votes, article_id)
    .then((updatedArticle) => {
      response.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticleById, getArticles, patchArticle };
