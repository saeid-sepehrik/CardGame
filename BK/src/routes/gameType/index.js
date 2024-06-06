const express = require("express");
const router = express.Router();
const GameType = require("./../../models/gameTypeModel");

router.get("/", async (req, res) => {
  const gameType = await GameType.find();
  res.json({
    data: gameType,
    message: "OK3",
  });
});

router.get("/:id", async (req, res) => {
  const gameType = await gameTypeModel.findById(_id == req.params.id);
  if (!gameType) {
    res.status(404),
      res.json({
        data: null,
        message: "game type not found",
      });
  }
  res.json({
    data: gameType,
    message: "OK3",
  });
});

// router.post('/', [
//     body('title', 'title is null!').notEmpty(),
//     body('title_fn', 'title is null!').notEmpty(),
//     body('pic_path', 'pic_path is null!').notEmpty()
// ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ data: null, errors: errors.array(), message: 'validation error' })
//         }
//         let newGameType = new gameTypeModel({
//             title: req.body.title,
//             title_fn: req.body.title_fn,
//             is_active: req.body.is_activele,
//             pic_path: req.body.pic_path,
//             dsc: req.body.dsc,
//         })
//         newGameType = await newGameType.save();
//         res.json({
//             data: newGameType,
//             message: 'ok'
//         })
//     });

// router.put('/:id', [
//     body('title', 'title is null!').notEmpty(),
//     body('title_fn', 'title is null!').notEmpty(),
//     body('pic_path', 'pic_path is null!').notEmpty()
// ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ data: null, errors: errors.array(), message: 'validation error' });
//         }
//         const gameType = gameTypeModel.findByIdAndUpdate(req.params.id, {
//             title: req.body.title,
//             title_fn: req.body.title_fn,
//             is_active: req.body.is_activele,
//             pic_path: req.body.pic_path,
//             dsc: req.body.dsc,
//         }, { new: true });

//         if (!gameType) {
//             return res.status(404).json({
//                 data: null,
//                 message: 'gameType with input id not found'
//             })
//         }

//         res.json({
//             data: gameType,
//             message: 'ok'
//         });
//     });

// router.delete('/:id',
//     async (req, res) => {
//         const gameType = await gameTypeModel.findByIdAndRemove(req.params.id);
//         if (!gameType) {
//             return res.status(404).json({
//                 data: null,
//                 message: 'game type with input id not found'
//             })
//         }

//         res.json({
//             data: gameType,
//             message: 'ok',
//         });
//     });

module.exports = router;
