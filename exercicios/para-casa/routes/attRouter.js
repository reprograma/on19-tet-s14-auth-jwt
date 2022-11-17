const atividadeController = require("../controller/atividadeController")
const express = require("express");
const router = express.Router();


router.get("/", atividadeController.getAll);
router.get("/atividade", atividadeController.getAll);
router.post("/", atividadeController.postAtividade);
router.post('/login', atividadeController.login);

module.exports = router;