const express = require('express');
const router = express.Router();
const controller = require('./contrroller');

router.get(
    '/',
    controller.dashboard
);

module.exports = router;