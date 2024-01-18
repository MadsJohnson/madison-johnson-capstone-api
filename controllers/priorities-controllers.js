const knex = require("knex")(require("../knexfile"));

// Find all priorities
const getPriorities = (_req, res) => {
    knex("priorities")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving priorities: ${err}`);
        });
};


const getPrioritiesById = (req, res) => {
    knex("priorities")
        .where({ priority_id: req.params.priority_id })
        .then((priorityFound) => {
            if (priorityFound.length === 0) {
                return res
                    .status(404)
                    .json({ message: `priority with ID: ${req.params.priority_id} not found` });
            }

            const priorityData = noteFound[0];
            res.status(200).json(priorityData);
        })
        .catch(() => {
            res.status(500).json({
                message: `Unable to retrieve note data for todo with ID: ${req.params.priority_id}`,
            });
        });

};


const addPriority = (req, res) => {
    knex("priorities")
        .insert(req.body)
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
    const { priority, due_date, completed} = req.body;
  
    knex("priorities")
      .where({ priority_id: req.params.priority_id })
      .update({ priority, due_date, completed})
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
    knex("priorities")
        .where({ priority_id: req.params.priority_id })
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
