const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const GameRole = require("../../models/gameRoleModel");

router.get("/", async (req, res) => {
  const gameRole = await GameRole.find();
  res.json({
    data: gameRole,
    message: "OK3",
  });
});

router.get("/:idgame", async (req, res) => {
  // console.log(req.params.idgameType);
  const gameRole = await GameRole.find({ id_game: req.params.idgame });
  // console.log({ 'id_game_type': req.params.idgameType });
  if (!gameRole) {
    res.status(404),
      res.json({
        data: null,
        message: "gameRole not found",
      });
  }
  res.json({
    data: gameRole,
    message: "OK3",
  });
});

router.post(
  "/",
  [
    body("id_game", "id_game is null!").notEmpty(),
    body("id_role", "id_role is null!").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        errors: errors.array(),
        message: "validation error",
      });
    }
    let newGameRole = new GameRole({
      id_game: req.body.id_game,
      id_role: req.body.id_role,
      status: 1,
    });
    newGameRole = await newGameRole.save();
    res.json({
      data: newGameRole,
      message: "insert new GameRole",
    });
  }
);

module.exports = router;
