const router = require("express").Router();
const todoController = require("../controllers/todo-controllers.js");

router.route("/").get(todoController.todo);

module.exports = router;

