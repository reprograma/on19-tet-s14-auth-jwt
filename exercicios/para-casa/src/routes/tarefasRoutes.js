const controller = require("../controllers/tarefasControllers");
const express = require("express");
const router = express.Router();

router.get("/", controller.getAllTasks);
router.post("/", controller.createTasks);
router.post('/login', controller.checkToken);

module.exports = router;