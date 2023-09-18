const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller {
    async dashboard(req, res) {
        res.send('user das hboard');
    }
    async me(req, res) {
        this.respons({ res, data: _.pick(req.user, ["name", "email"]) })
    }
})();