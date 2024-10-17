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


function getArticles(request, response, next) {
  const { sort_by, order, topic } = request.query;
  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function patchArticle(request, response, next) {
  const { inc_votes } = request.body;
  const { article_id } = request.params;

  const promises = [
    fetchArticleById(article_id),
    updateArticleVotes(inc_votes, article_id),
  ];
  Promise.all(promises)
    .then((results) => {
      const updatedArticle = results[1];
      response.status(200).send({ updatedArticle });
    })
    .catch((err) => {
      next(err);
    });

}

module.exports = { getArticleById, getArticles, patchArticle };
