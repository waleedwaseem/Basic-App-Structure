const express = require("express");
const router = express.Router();
const fooController = require("../controllers/foo");

router.post("/signup", fooController.create);

router.delete("/:user_id", fooController.remove);

router.patch("/:user_id", fooController.update);

module.exports = router;
