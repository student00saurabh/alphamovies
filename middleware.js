const User = require("./models/user");

const ExpressError = require("./utils/ExpressError.js");

const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you are not loggedin!");
    return res.redirect("/login");
  }
  next();
};
