const controller = require("../controller/tarefaController")
const express = require("express")
const router = express.Router();

router.get("/", controller.verifyToken, controller.getAll);
router.post("/", controller.postTarefa);
router.post("/login", controller.login);


module.exports = router