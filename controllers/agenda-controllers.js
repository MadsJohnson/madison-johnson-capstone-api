const knex = require("knex")(require("../knexfile"));

// Find all todos
const getAgenda = (_req, res) => {
    knex("agenda")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving agenda: ${err}`);
        });
};


const getAgendaById = (req, res) => {
    knex("agenda")
        .where({ id: req.params.id })
        .then((agendaFound) => {
            if (agendaFound.length === 0) {
                return res
                    .status(404)
                    .json({ message: `agenda item with ID: ${req.params.id} not found` });
            }

            const agendaData = agendaFound[0];
            res.status(200).json(agendaData);
        })
        .catch(() => {
            res.status(500).json({
                message: `Unable to retrieve agenda item with ID: ${req.params.id}`,
            });
        });

};


const addAgenda = (req, res) => {
    knex("agenda")
        .insert(req.body)
        .then((result) => {
            const agendaID = result[0];
            return knex("agenda").where({ id: agendaID }).first();
        })
        .then((createAgenda) => {
            res.status(201).json(createAgenda);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new agenda item" });
        });
};

const updateAgenda = (req, res) => {
    const {date, time, task } = req.body;
  
    knex("agenda")
      .where({ id: req.params.id })
      .update({ date, time, task})
      .then(() => {
        return knex("agenda").where({ id: req.params.id }).first();
      })
      .then((updatedAgenda) => {
        res.status(200).json(updatedAgenda);
      })
      .catch((err) => {
        res.status(400).send(`Error updating agenda: ${err}`);
      });
  };
  

const deleteAgenda = (req, res) => {
    knex("agenda")
        .where({ id: req.params.id })
        .del()
        .then((result) => {
            if (result === 0) {
                return res.status(400).json({
                    message: `Agenda item with ID: ${req.params.id} to be deleted not found.`,
                });
            }

            res.status(204).send();
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to delete agenda item" });
        });
};



module.exports = {
    getAgenda,
    getAgendaById,
    addAgenda,
    updateAgenda,
    deleteAgenda,
};
