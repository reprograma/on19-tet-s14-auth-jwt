const controller = require("../controllers/tarefaController");
const express = require("express");
const router = express.Router();


router.get("/", controller.getAll);
router.post("/novatarefa", controller.postTarefas);
router.post("/tarefacadastrada", controller.tarefaCadastrada);

module.exports = router;