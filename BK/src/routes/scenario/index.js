const express = require('express');
const router = express.Router();
const Scenario = require('../../models/scenario');

router.get('/', async (req, res) => {
    const scenario = await Scenario.find();
    res.json({
        data: scenario,
        message: 'OK3',
    })
});


router.get('/:idgameType', async (req, res) => {
    // console.log(req.params.idgameType);
    const scenario = await Scenario.find({ 'id_game_type': req.params.idgameType })
    // console.log({ 'id_game_type': req.params.idgameType });
    if (!scenario) {
        res.status(404),
            res.json({
                data: null,
                message: 'scenario not found'
            })
    }
    res.json({
        data: scenario,
        message: 'OK3',
    })
});

module.exports = router;
