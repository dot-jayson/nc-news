const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");

const endpoints = require("./endpoints.json");
const {
  getArticleById,
  getArticles,
  patchArticle,
} = require("./controllers/articles.controllers");
const {
  getCommentsbyArticleId,
  postComment,
  deleteComment,
} = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api", (request, response) => {
  response.status(200).send(endpoints);
});

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsbyArticleId);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

// Unhandled errors
app.use((err, request, response, next) => {
  // const unhandledError = err;
  console.log({ unhandledError });
  response.status(500).send({ msg: "500 server error" });
});

module.exports = app;
