const { fetchArticleById } = require("../models/articles.models");

function getArticleById(request, response) {
  fetchArticleById(request.params.article_id).then((article) => {
    response.status(200).send({ article: article.rows });
  });
}

module.exports = { getArticleById };
