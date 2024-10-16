const { fetchUsers } = require("../models/users.models");

function getUsers(request, response) {
  fetchUsers().then((users) => {
    response.status(200).send({ users });
  });
}

module.exports = { getUsers };