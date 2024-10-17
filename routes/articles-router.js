const articlesRouter = require("express").Router();
const {
  getArticleById,
  getArticles,
  patchArticle,
} = require("../controllers/articles.controllers");

const {
  getCommentsbyArticleId,
  postComment,
} = require("../controllers/comments.controllers");

articlesRouter.get("/", getArticles);

articlesRouter.route("/:article_id").get(getArticleById).patch(patchArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsbyArticleId)
  .post(postComment);

module.exports = articlesRouter;
