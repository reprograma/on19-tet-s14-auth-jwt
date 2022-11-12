const controller = require("../controllers/colaboradorasController");
const express = require("express");
const router = express.Router();


router.get("/", controller.findAllColaboradoras);
router.post("/", controller.addNewColaboradora);

module.exports = router;