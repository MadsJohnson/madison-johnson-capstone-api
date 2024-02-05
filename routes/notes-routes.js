const router = require("express").Router();
const notesController = require("../controllers/notes-controllers");

router.route("/")
    .get(notesController.getNotes)
    .post(notesController.addNote);

router.route("/:note_id")
    .get(notesController.getNoteById)
    .delete(notesController.deleteNote)
    .put(notesController.updateNote);

module.exports = router;