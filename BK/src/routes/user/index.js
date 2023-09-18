const express = require('express');
const router = express.Router();
const controller = require('./contrroller');

router.get(
    '/',
    controller.dashboard
);
router.get(
    '/me',
    controller.me
);

module.exports = router;