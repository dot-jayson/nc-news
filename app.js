const express = require("express");
const { getTopics } = require("./controllers/topics.controllers");

const app = express();

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  const unhandledError = err;
  console.log({ unhandledError });
  res.status(500).send({ msg: "500 server error" });
});

module.exports = app;
