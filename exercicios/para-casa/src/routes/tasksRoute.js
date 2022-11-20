const controller = require('../controllers/tasksController');
const express = require('express');
const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.postTasks);
router.post("/login", controller.login);

module.exports = router;