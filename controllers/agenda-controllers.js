const knex = require("knex")(require("../knexfile"));

// Find agenda items for user
const getAgenda = (req, res) => {
    const user_id = req.decoded.userId; 
    
    knex("agenda")
        .where({ user_id }) // Filter by user_id
        .then((data) => {
            console.log('Agenda data:', data); 
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving agenda: ${err}`);
        });
};

// get individual agenda item for user 
const getAgendaById = (req, res) => {
    const user_id = req.decoded.userId;
    
    knex("agenda")
        .where({ id: req.params.id, user_id }) // Filter by agenda item ID and user_id
        .then((agendaFound) => {
            if (agendaFound.length === 0) {
                return res.status(404).json({ message: `Agenda item not found` });
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
    const { date, time, task } = req.body;
    const user_id = req.decoded.userId; 

    knex("agenda")
        .insert({ date, time, task, user_id }) 
        .then((result) => {
            const agendaID = result[0];
            return knex("agenda").where({ id: agendaID, user_id }).first();
        })
        .then((createAgenda) => {
            res.status(201).json(createAgenda);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new agenda item" });
        });
};

const updateAgenda = (req, res) => {
    const { date, time, task } = req.body;
    const user_id = req.decoded.userId; 

    knex("agenda")
        .where({ id: req.params.id, user_id }) 
        .update({ date, time, task })
        .then(() => {
            return knex("agenda").where({ id: req.params.id, user_id }).first();
        })
        .then((updatedAgenda) => {
            res.status(200).json(updatedAgenda);
        })
        .catch((err) => {
            res.status(400).send(`Error updating agenda: ${err}`);
        });
};

  

const deleteAgenda = (req, res) => {
    const user_id = req.decoded.userId; 
    knex("agenda")
        .where({ id: req.params.id, user_id })
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
