'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
path = require('path'),
Producto = require('mongoose').model('Producto'),
  config = require(path.resolve('./config/config'));

/**
 * Productos module init function.
 */
module.exports = function (app) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function (id, done) {
    Producto.findOne({
      _id: id
    }, '-salt -password', function (err, user) {
      done(err, user);
    });
  });

  // Initialize strategies
  config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function (strategy) {
    require(path.resolve(strategy))(config);
  });

  // Add passport's middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
