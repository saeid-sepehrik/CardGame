const express = require("express");
const router = express.Router();

const Role = require("../../models/role");

router.post("/game/game", async (req, res) => {
  const role = await Role.find({ _id: { $in: req.body.ids } });
  if (!role) {
    res.status(404),
      res.json({
        data: null,
        message: "rooole not found",
      });
  } else {
    res.json({
      data: role,
      message: "OK33",
    });
  }
});
router.get("/", async (req, res) => {
  const role = await Rule.find();
  res.json({
    data: role,
    message: "OK3",
  });
});

router.get("/:code", async (req, res) => {
  var codes = [];
  if (req.params.code == 1) codes.push(1, 3, 5, 7);
  else if (req.params.code == 2) codes.push(2, 3, 6, 7);
  else if (req.params.code == 4) codes.push(4, 5, 6, 7);
  const role = await Role.find({ mask_code_scenarios: { $in: codes } });
  if (!role) {
    res.status(404),
      res.json({
        data: null,
        message: "scenario not found",
      });
  }
  res.json({
    data: role,
    message: "OK335",
  });
});

router.get("/id/:id", async (req, res) => {
  const role = await Role.findById(req.params.id);
  if (!role) {
    res.status(404),
      res.json({
        data: null,
        message: "scenarioo not found",
      });
  } else {
    res.json({
      data: role,
      message: "OK334",
    });
  }
});

module.exports = router;
