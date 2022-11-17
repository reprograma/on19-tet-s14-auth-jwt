const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).json({
        title: "Reprograma On19 - Semana 14 - Autenticação com JWT",
        version: "1.0.0"
    })
})

module.exports = router
