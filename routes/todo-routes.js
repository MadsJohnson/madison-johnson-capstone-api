const router = require("express").Router();
const todoController = require("../controllers/todo-controllers.js");

router.route("/")
    .get(todoController.todo);

router.route("/:task_id")
    .get(todoController.getTodoById);

module.exports = router;

