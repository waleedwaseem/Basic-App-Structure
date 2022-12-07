const express = require("express");
const router = express.Router();
const userRouter = require("../routes/user");
const firebaseRouter = require("../routes/firebaseTest");
router.use("/user", userRouter);
router.use("/firebase", firebaseRouter);

module.exports = router;
