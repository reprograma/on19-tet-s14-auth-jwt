const controller = require("../controllers/colaboradoras");
const express = require("express");
const router = express.Router();


router.get("/", controller.getAll);