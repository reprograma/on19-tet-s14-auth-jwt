const controller = require("../controller/TarefasController");
const express = require("express");
const router = express.Router();

router.get("/oi", function (req, res) {
    res.status(200).send({
        title: "Olá testandooooo!!! "
    })
})

router.get("/", controller.getAll);
router.post("/", controller.postTarefa);
router.post("/login", controller.login);

module.exports = router;