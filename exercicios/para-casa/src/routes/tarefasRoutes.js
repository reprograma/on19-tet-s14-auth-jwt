const controller = require("../controllers/tarefaController");
const express = require("express");
const router = express.Router();


router.get("/all", controller.getAll);
router.post("/new", controller.postTarefa);
router.post("/login", controller.login);

module.exports = router;