const controller = require("../controllers/colaboradorasController");
const express = require("express");
const router = express.Router();


router.get("/all", controller.getAll);
router.post("/create", controller.postColaboradora);
router.post("/login", controller.login);

module.exports = router;