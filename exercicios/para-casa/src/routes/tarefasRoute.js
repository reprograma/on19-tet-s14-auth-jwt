const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();


router.get("/", controller.getAll);
router.post("/add", controller.postTarefa);
router.post("/login", controller.login);

module.exports = router;