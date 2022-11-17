const controller = require("../controllers/taskController")
const express = require("express")
const router = express.Router();

router.get("/", controller.verifyToken, controller.getAll);
router.post("/", controller.postTask);
router.post("/login", controller.login);


module.exports = router