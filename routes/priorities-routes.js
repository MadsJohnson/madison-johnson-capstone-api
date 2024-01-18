const router = require("express").Router();
const priorityController = require("../controllers/priorities-controllers");

router.route("/")
    .get(priorityController.getPriorities)
    .post(priorityController.addPriority);

router.route("/:priority_id")
    .get(priorityController.getPrioritiesById)
    .delete(priorityController.deletePriority)
    .put(priorityController.updatePriority);

module.exports = router;