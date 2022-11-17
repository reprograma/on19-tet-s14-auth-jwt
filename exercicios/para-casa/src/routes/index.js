const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma On19 - Semana 14 - Autenticação",
        author: "Laura Rocha",
        version: "1.1.0"
    })
})

module.exports = router
