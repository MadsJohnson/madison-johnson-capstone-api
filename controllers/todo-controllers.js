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


const getTodoById = async (req, res) => {
    knex("todo")
        .where({ task_id: req.params.task_id })
        .then((todoFound) => {
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


const addTodo = (req, res) => {
    knex("todo")
        .insert(req.body)
        .then((result) => {
            const todoId = result[0];
            return knex("todo").where({ task_id: todoId }).first();
        })
        .then((createdTodo) => {
            res.status(201).json(createdTodo);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new todo" });
        });
};

const updateTodo = (req, res) => {
    const { task, due_date, completed } = req.body;
  
    knex("todo")
      .where({ task_id: req.params.task_id })
      .update({ task, due_date, completed })
      .then(() => {
        res.status(200).send("Todo updated successfully");
      })
      .catch((err) => {
        res.status(400).send(`Error updating todo: ${err}`);
      });
  };
  

const deleteToDo = (req, res) => {
    knex("todo")
        .where({ task_id: req.params.task_id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res.status(400).json({
                    message: `Todo with ID: ${req.params.task_id} to be deleted not found.`,
                });
            }

            res.status(204).send();
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to delete todo" });
        });
};



module.exports = {
    todo,
    getTodoById,
    addTodo,
    deleteToDo,
    updateTodo
};
