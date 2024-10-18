const { fetchUsers, fetchUserByUsername } = require("../models/users.models");

function getUsers(request, response) {
  fetchUsers().then((users) => {
    response.status(200).send({ users });
  });
}

function getUserByUsername(request, response, next) {
  fetchUserByUsername(request.params.username)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers, getUserByUsername };
