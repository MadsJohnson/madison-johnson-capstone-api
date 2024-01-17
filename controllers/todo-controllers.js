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

// find todo with given id 
const getTodoById = async (req, res) => {
    knex("todo")
    .where({task_id: req.params.task_id})
    .then((todoFound)=> {
        if (todoFound.length === 0) {
            return res
            .status(404)
            .json({ message: `todo with ID: ${req.params.task_id} not found` });
        }

        const todoData = todoFound[0];
        res.status(200).json(todoData);
    })
    .catch(() => {
        res.status(500).json({
          message: `Unable to retrieve todo data for todo with ID: ${req.params.task_id}`,
        });
      });
    
  };


module.exports = {
  todo,
  getTodoById
};
