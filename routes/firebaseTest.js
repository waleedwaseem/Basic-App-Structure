const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firebaseTest");
router.get("/", firebaseController.getAll);
module.exports = router;
