const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/signup", userController.create);
router.delete("/:id", userController.archive);
router.put("/:id", userController.update);

module.exports = router;
