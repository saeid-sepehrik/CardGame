const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Message = require("../../models/message");

router.get("/game/:id", async (req, res) => {
  const message = await Message.find({ id_game: req.params.id });
  if (!message) {
    res.status(404),
      res.json({
        data: null,
        message: "message with id game not found",
      });
  } else {
    res.json({
      data: message,
      message: "get messages with id game",
    });
  }
});

router.get("/player/:id", async (req, res) => {
  const message = await Message.find({ id_player: req.params.id });
  if (!message) {
    res.status(404),
      res.json({
        data: null,
        message: "message with id player not found",
      });
  } else {
    res.json({
      data: message,
      message: "get messages with id player",
    });
  }
});

router.post(
  "/",
  [
    body("id_game", "id_game is null!").notEmpty(),
    body("id_player", "id_player is null!").notEmpty(),
    body("text", "text is null!").notEmpty(),
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
    let newMessage = new Message({
      id_game: req.body.id_game,
      id_player: req.body.id_player,
      text: req.body.text,
      read: false,
    });
    newMessage = await newMessage.save();
    res.json({
      data: newMessage,
      message: "insert new message",
    });
  }
);

router.put("/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const updateDoc = {
    $set: {
      read: req.body.read,
      action: req.body.action,
    },
  };
  const message = await Message.updateOne(filter, updateDoc);
  res.json({
    data: message,
    message: "update message",
  });
});

module.exports = router;
