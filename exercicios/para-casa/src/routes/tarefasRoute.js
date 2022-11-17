const tarefasController = require('../controllers/tarefasController');
const express = require('express');
const router = express.Router();


router.get("/", tarefasController.getAll);
router.post("/", tarefasController.postTarefa);
router.post("/login", tarefasController.login);

module.exports = router;



