const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");

async function isLoggined(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("access denied");
  } else {
    try {
      const decoded = jwt.verify(
        token,
        "sdf4s15fsdf211suikjgfldDFGads515t5bdfssd5fs5dFS5df"
      );
      const user = await User.findById(decoded._id);
      req.user = user;
      next();
    } catch (ex) {
      res.status(401).send("invalid token");
    }
  }
}

async function isAdmin(req, res, next) {
  if (!req.user.is_admin) res.status(403).send("access denied");
  next();
}

module.exports = {
  isLoggined,
  isAdmin,
};
