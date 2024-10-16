const { fetchTopics } = require("../models/topics.models");

function getTopics(request, response) {
  fetchTopics().then((topics) => {
    response.status(200).send({ topics });
  });
}

module.exports = { getTopics };
