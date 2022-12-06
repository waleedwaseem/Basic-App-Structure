const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
router.get("/", userController.getUsers);
router.get("/:user_id", userController.getUser);
router.post("/signup", userController.create);
router.delete("/:user_id", userController.remove);
router.put("/:user_id", userController.update);

module.exports = router;
