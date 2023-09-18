const mangoose = require('mongoose');
const debug = require('debug')('app:main');
const config = require('config');

module.exports = function () {
    mangoose
        .connect("mongodb://localhost:27017/cardGame")
        .then(() => debug('application connected to db'))
        .catch((err) => debug('could not connect to db'));
}