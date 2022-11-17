const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();

router.get("/tarefas", controller.getAll);
router.post("/", controller.postTarefas);
router.post('/login', controller.login);

module.exports = router;