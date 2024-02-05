const knex = require("knex")(require("../knexfile"));

// Find all and sort by completed and created_at todos

const getTodo = (req, res) => {
    const user_id = req.decoded.userId;
    const { date } = req.query;

    if (!date) {
        return res.status(400).send("Date parameter is required");
    }

    knex("todo")
        .where({ user_id, due_date: date })
        .orderBy('completed', 'desc')  
        .orderBy('created_at', 'asc')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving todo: ${err}`);
        });
};


const getTodoById = (req, res) => {
    const user_id = req.decoded.userId;

    knex("todo")
        .where({ task_id: req.params.task_id, user_id })
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
    const { task, due_date, completed } = req.body;
    const user_id = req.decoded.userId;

    knex("todo")
        .insert({task, due_date, completed, user_id})
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
    const user_id = req.decoded.userId;

    knex("todo")
        .where({ task_id: req.params.task_id, user_id})
        .update({ task, due_date, completed })
        .then(() => {
            res.status(200).send("Todo updated successfully");
        })
        .catch((err) => {
            res.status(400).send(`Error updating todo: ${err}`);
        });
};


const deleteToDo = (req, res) => {
    const user_id = req.decoded.userId;

    knex("todo")
        .where({ task_id: req.params.task_id , user_id})
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
    getTodo,
    getTodoById,
    addTodo,
    deleteToDo,
    updateTodo
};
