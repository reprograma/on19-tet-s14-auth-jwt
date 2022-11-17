const controller = require("../controllers/tarefasController");
const express = require('express');
const router = express.Router();


router.get("/", controller.getAll);
router.post("/add", controller.postTarefas)
router.post("/login", controller.login);
router.delete("/del", controller.excluiTarefa)

module.exports = router;