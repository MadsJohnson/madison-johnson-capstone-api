const knex = require("knex")(require("../knexfile"));

// Find all todos
const todo = (_req, res) => {
  knex("todo")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving todo: ${err}`);
    });
};

module.exports = {
  todo,
};
