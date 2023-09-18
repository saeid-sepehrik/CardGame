const controller = require('./../controller');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller {
    async register(req, res) {
        let user = await this.User.findOne({ email: req.body.email });
        if (user) {
            return this.respons({
                code: 400,
                res,
                message: 'this user already registered'
            });
        }
        // const { email, name, password } = req.body;
        // user = new this.User({ email, name, password });
        user = new this.User(_.pick(req.body, ["email", "name", "password"], ["is_admin"]));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        this.respons({
            res, message: "user successfully registered",
            data: _.pick(user, ["_id", "name", "email", "is_admin"])
        });
    }
    async login(req, res) {
        const user = await this.User.findOne({ email: req.body.email })
        if (!user) {
            return this.respons({
                res, code: 400, message: "invalid email or password"
            });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return this.respons({
                res, code: 400, message: "invalid email or password"
            });
        }

        const token = jwt.sign({ _id: user.id }, "sdf4s15fsdf211suikjgfldDFGads515t5bdfssd5fs5dFS5df");
        this.respons({ res, message: "successfull login", data: { token } });
    }
})();