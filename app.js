const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");

const endpoints = require("./endpoints.json");
const { getArticleById } = require("./controllers/articles.controllers");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", (request, response) => {
  response.status(200).send(endpoints);
});

app.get("/api/articles/:article_id", getArticleById);

app.use((err, request, response, next) => {
  const unhandledError = err;
  console.log({ unhandledError });
  res.status(500).send({ msg: "500 server error" });
});

module.exports = app;
