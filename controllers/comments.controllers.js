const { fetchCommmentsByArticleId } = require("../models/comments.models");

function getCommentsbyArticleId(request, response, next) {
  fetchCommmentsByArticleId(request.params.article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCommentsbyArticleId };
