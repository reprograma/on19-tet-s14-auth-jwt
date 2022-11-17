const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();

router.get("/tarefas", controller.getAll);


module.exports = router;