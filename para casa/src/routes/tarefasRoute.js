const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();


router.get("/", controller.getAll);

router.post("/", controller.postTarefa);


module.exports = router;