const knex = require("knex")(require("../knexfile"));

// Find all todos
const getNotes = (req, res) => {
    const user_id = req.decoded.userId;
    const { date } = req.query;

    knex("notes")
        .where({ user_id, date })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send(`Error retrieving notes: ${err}`);
        });
};


const getNoteById = (req, res) => {
    const user_id = req.decoded.userId;

    knex("notes")
        .where({ note_id: req.params.note_id, user_id })
        .then((noteFound) => {
            if (noteFound.length === 0) {
                return res
                    .status(404)
                    .json({ message: `notes with ID: ${req.params.note_id} not found` });
            }

            const noteData = noteFound[0];
            res.status(200).json(noteData);
        })
        .catch(() => {
            res.status(500).json({
                message: `Unable to retrieve note data for todo with ID: ${req.params.note_id}`,
            });
        });

};


const addNote = (req, res) => {
    const { note, due_date, completed } = req.body;
    const user_id = req.decoded.userId; 

    knex("notes")
        .insert({note, due_date, completed, user_id})
        .then((result) => {
            const noteID = result[0];
            return knex("notes").where({ note_id: noteID }).first();
        })
        .then((createdNote) => {
            res.status(201).json(createdNote);
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to create new note" });
        });
};

const updateNote = (req, res) => {
    const { note, due_date, completed } = req.body;
    const user_id = req.decoded.userId; 

    knex("notes")
        .where({ note_id: req.params.note_id, user_id })
        .update({ note, due_date, completed })
        .then(() => {
            return knex("notes").where({ note_id: req.params.note_id }).first();
        })
        .then((updatedNote) => {
            res.status(200).json(updatedNote);
        })
        .catch((err) => {
            res.status(400).send(`Error updating note: ${err}`);
        });
};


const deleteNote = (req, res) => {
    const user_id = req.decoded.userId; 
    knex("notes")
        .where({ note_id: req.params.note_id , user_id})
        .del()
        .then((result) => {
            if (result === 0) {
                return res.status(400).json({
                    message: `Note with ID: ${req.params.note_id} to be deleted not found.`,
                });
            }

            res.status(204).send();
        })
        .catch(() => {
            res.status(500).json({ message: "Unable to delete note" });
        });
};



module.exports = {
    getNotes,
    getNoteById,
    addNote,
    deleteNote,
    updateNote
};
