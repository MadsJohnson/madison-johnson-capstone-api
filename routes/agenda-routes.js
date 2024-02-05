const router = require("express").Router();
const agendaControllers = require("../controllers/agenda-controllers");

router.route("/")
    .get(agendaControllers.getAgenda)
    .post(agendaControllers.addAgenda);

router.route("/:id")
    .get(agendaControllers.getAgendaById)
    .delete(agendaControllers.deleteAgenda)
    .put(agendaControllers.updateAgenda);

module.exports = router;