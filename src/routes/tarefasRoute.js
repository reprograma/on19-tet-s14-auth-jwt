const taskController = require("../controller/tarefasController")
const express = require("express");
const router = express.Router();


router.get("/", taskController.getAll);
router.get("/task", taskController.getAll);
router.post("/", taskController.postTask);
router.post('/login', taskController.login);

module.exports = router;