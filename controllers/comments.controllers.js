const { fetchArticleById } = require("../models/articles.models");
const {
  fetchCommmentsByArticleId,
  insertComment,
  removeCommentById,
  updateCommentVotes,
} = require("../models/comments.models");

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

function postComment(request, response, next) {
  const { article_id } = request.params;
  const newComment = request.body;

  const promises = [
    fetchArticleById(article_id),
    insertComment(newComment, article_id),
  ];

  Promise.all(promises)
    .then((results) => {
      const comment = results[1];
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteComment(request, response, next) {
  const { comment_id } = request.params;
  removeCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

function patchComment(request, response, next) {
  const { inc_votes } = request.body;
  const { comment_id } = request.params;

  updateCommentVotes(inc_votes, comment_id)
    .then((updatedComment) => {
      response.status(200).send({ updatedComment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getCommentsbyArticleId,
  postComment,
  deleteComment,
  patchComment,
};
