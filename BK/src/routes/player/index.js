const express = require("express");
const router = express.Router();
const playerModel = require("../../models/player");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const player = await player.find();
  res.json({
    data: player,
    message: "OK3",
  });
});

router.get("/joinGame/:id", async (req, res) => {
  const player = await playerModel.find({ id_game: req.params.id });
  if (!player) {
    res.status(404),
      res.json({
        data: null,
        message: "scenario not found",
      });
  }
  res.json({
    data: player,
    message: "OK333",
  });
});

router.get("/:id", async (req, res) => {
  const player = await playerModel.findOne({ _id: req.params.id });
  if (!player) {
    res.status(404),
      res.json({
        data: null,
        message: "player not found",
      });
  }
  res.json({
    data: player,
    message: "OK333",
  });
});

router.post(
  "/",
  [
    body("name", "name is null!").notEmpty(),
    body("id_game", "id_game type is null!").notEmpty(),
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
    let newPlayer = new playerModel({
      name: req.body.name,
      id_game: req.body.id_game,
    });
    newPlayer = await newPlayer.save();
    res.json({
      data: newPlayer,
      message: "insert new player",
    });
  }
);

module.exports = router;
