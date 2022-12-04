const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();

router.get("/tarefas", controller.listaTudo);
router.post("/criar", controller.postTarefas);
router.post("/login", controller.login);
router.delete("/deletar/:id", controller.deletaPorId);

module.exports = router;