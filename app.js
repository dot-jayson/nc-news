const express = require("express");

const app = express();

const cors = require("cors");

app.use(express.json());

app.use(cors());

// API router
const apiRouter = require("./routes/api-router");
app.use("/api", apiRouter);

// Error for invalid inputs
app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

// Custom Errors
app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

// Unhandled errors
app.use((err, request, response, next) => {
  const unhandledError = err;
  // console.log({ unhandledError });
  response.status(500).send({ msg: "500 server error" });
});

module.exports = app;
