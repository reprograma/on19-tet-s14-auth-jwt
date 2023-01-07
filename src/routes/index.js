const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "[Reprograma] Week XIV homework.",
        version: "1.0.2"
    })
})

module.exports = router
