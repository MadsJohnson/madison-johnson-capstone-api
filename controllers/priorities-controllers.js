const knex = require("knex")(require("../knexfile"));

const getPriorities = (req, res) => {
    const user_id = req.decoded.userId;
    const { date } = req.query;

    if (!date) {
        return res.status(400).send("Date parameter is required");
    }

    knex("priorities")
        .where({ user_id, due_date: date })
        .orderBy('completed', 'desc') 
        .orderBy('created_at', 'asc')  
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving priorities: ${err}`);
        });
};


const getPrioritiesById = (req, res) => {
    const user_id = req.decoded.userId;

    knex("priorities")
        .where({ priority_id: req.params.priority_id, user_id })
        .then((priorityFound) => {
            if (priorityFound.length === 0) {
                return res
                    .status(404)
                    .json({ message: `priority with ID: ${req.params.priority_id} not found` });
            }

            const priorityData = priorityFound[0];
            res.status(200).json(priorityData);
        })
        .catch(() => {
            res.status(500).json({
                message: `Unable to retrieve note data for todo with ID: ${req.params.priority_id}`,
            });
        });
};


const addPriority = (req, res) => {
    const { priority, due_date, completed } = req.body;
    const user_id = req.decoded.userId;

    knex("priorities")
        .insert({ priority, due_date, completed, user_id })
        .then((result) => {
            const priorityId = result[0];
            return knex("priorities").where({ priority_id: priorityId }).first();
        })
        .then((createdPriority) => {
            res.status(201).json(createdPriority);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new priority" });
        });
};

const updatePriority = (req, res) => {
    const { priority, due_date, completed } = req.body;
    const user_id = req.decoded.userId;

    knex("priorities")
        .where({ priority_id: req.params.priority_id, user_id })
        .update({ priority, due_date, completed })
        .then(() => {
            return knex("priorities").where({ priority_id: req.params.priority_id }).first();
        })
        .then((updatedPriority) => {
            res.status(200).json(updatedPriority);
        })
        .catch((err) => {
            res.status(400).send(`Error updating priority: ${err}`);
        });
};


const deletePriority = (req, res) => {
    const user_id = req.decoded.userId;

    knex("priorities")
        .where({ priority_id: req.params.priority_id, user_id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res.status(400).json({
                    message: `Priority with ID: ${req.params.priority_id} to be deleted not found.`,
                });
            }

            res.status(204).send();
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to delete priority" });
        });
};


module.exports = {
    getPriorities,
    getPrioritiesById,
    addPriority,
    deletePriority,
    updatePriority
};
