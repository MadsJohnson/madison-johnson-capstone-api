const router = require("express").Router();
const todoController = require("../controllers/todo-controllers.js");

router.route("/")
    .get(todoController.getTodo)
    .post(todoController.addTodo);

router.route("/:task_id")
    .get(todoController.getTodoById)
    .delete(todoController.deleteToDo)
    .put(todoController.updateTodo);

module.exports = router;

