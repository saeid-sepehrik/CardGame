const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const adminRouter = require("./admin");
const gameType = require("./gameType");
const scenario = require("./scenario");
const role = require("./role");
const game = require("./game");
const gameRole = require("./gameRole");
const { isLoggined, isAdmin } = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use("/auth", authRouter);
router.use("/user", isLoggined, userRouter);
router.use("/admin", isLoggined, isAdmin, adminRouter);
router.use("/gameType", gameType);
router.use("/scenario", scenario);
router.use("/role", role);
router.use("/game", game);
router.use("/gameRole", gameRole);

router.use(error);

module.exports = router;
