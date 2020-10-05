const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/api", controllers.index);

module.exports = router;
