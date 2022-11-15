const controller = require("../controllers/colaboradorasController");
const express = require("express");
const router = express.Router();


router.get("/", controller.getAll);
router.get("/colaboradoras", controller.getAll);
router.post("/", controller.postColaboradora);
router.post("/login", controller.login);

module.exports = router;