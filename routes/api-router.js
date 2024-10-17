const apiRouter = require("express").Router();
const usersRouter = require("./users-router");
const topicsRouter = require("./topics-router");
const articlesRouter = require("./articles-router");
const endpoints = require("../endpoints.json");
const commentsRouter = require("./comments-router");

apiRouter.get("/", (request, response) => {
  response.status(200).send(endpoints);
});

// User requests
apiRouter.use("/users", usersRouter);

// Topics requests
apiRouter.use("/topics", topicsRouter);

// Articles requests
apiRouter.use("/articles", articlesRouter);

// Comments requests
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
