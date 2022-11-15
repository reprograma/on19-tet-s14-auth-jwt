const controller = require("../controllers/contributorController")
const express = require("express")
const router = express.Router();

router.get("/", controller.verifyToken, controller.getAll);
router.post("/", controller.postContributor);
router.post("/login", controller.login);


module.exports = router