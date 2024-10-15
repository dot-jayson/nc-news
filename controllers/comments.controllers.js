const { fetchCommmentsByArticleId } = require("../models/comments.models");

function getCommentsbyArticleId(request, response) {
  fetchCommmentsByArticleId(request.params.article_id).then((comments) => {
    console.log(comments);
    response.status(200).send({ comments });
  });
}

module.exports = { getCommentsbyArticleId };
