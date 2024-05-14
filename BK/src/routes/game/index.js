const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const gameModel = require("../../models/gameModel");
const Game = require("../../models/gameModel");

router.get("/:id", async (req, res) => {
  const game = await Game.find({ _id: req.params.id });
  if (!game) {
    res.status(404),
      res.json({
        data: null,
        message: "game not found",
      });
  }
  res.json({
    data: game,
    message: "OK33",
  });
});

router.get("/withCode/:code", async (req, res) => {
  const game = await Game.find({ code: req.params.code });
  if (game.length === 0) {
    res.status(404),
      res.json({
        data: null,
        message: "game not found",
      });
  } else {
    res.json({
      data: game,
      message: "OK33",
    });
  }
});

router.post(
  "/",
  // [
  //   body.data("code_scenario", "id_scenario is null!").notEmpty(),
  //   body.data("title_game_type", "title_game type is null!").notEmpty(),
  //   body.data("title_scenario", "title scenario is null!").notEmpty(),
  //   body.data("code", "code is null!").notEmpty(),
  //   body.data("status", "status is null!").notEmpty(),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     data: null,
    //     errors: errors.array(),
    //     message: "validation error",
    //   });
    // }
    let newGame = new gameModel({
      code_scenario: req.body.data.code_scenario,
      id_game_type: req.body.data.id_game_type,
      status: req.body.data.status,
      code: req.body.data.code,
    });
    newGame = await newGame.save();
    res.json({
      data: newGame,
      message: "insert game",
    });
  }
);

router.put("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const updateDoc = {
    $set: {
      code_scenario: req.body.data.code_scenario,
      id_game_type: req.body.data.id_game_type,
      status: req.body.data.status,
      code: req.body.data.code,
    },
  };
  const game = await Game.updateOne(filter, updateDoc);
  res.json({
    data: req.body.data,
    message: "OK33",
  });
});

module.exports = router;
