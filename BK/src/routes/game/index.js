const { body, validationResult } = require('express-validator')
const express = require('express');
const router = express.Router();
const gameModel = require('../../models/gameModel');
router.get(
    '/',

);
router.get(
    '/me',

);

router.post('/', [
    body('code_scenario', 'id_scenario is null!').notEmpty(),
    body('title_game_type', 'title_game type is null!').notEmpty(),
    body('title_scenario', 'title scenario is null!').notEmpty(),
    body('code', 'code is null!').notEmpty(),
    body('status', 'status is null!').notEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: null, errors: errors.array(), message: 'validation error' })
        }
        let newGame = new gameModel({
            code_scenario: req.body.code_scenario,
            title_game_type: req.body.title_game_type,
            title_scenario: req.body.title_scenario,
            status: req.body.status,
            code: req.body.code
        })
        newGame = await newGame.save();
        res.json({
            data: newGame,
            message: 'insert new game'
        })
    });

module.exports = router;