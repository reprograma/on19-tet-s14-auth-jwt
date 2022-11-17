const controller = require("../controller/controllerTarefas");
const express = require("express");
const router = express.Router();


//router.get("/", controller.AllTarefa)
//chamando no postman - localhost:3021/tarefa/


router.get("/all", controller.AllTarefa)
//chamando a rota no postman- localhost:3021/tarefa/add
router.post("/add", controller.AddTarefa)

// localhost:3021/tarefa/acess
router.post("/acess", controller.acess)
module.exports = router;
