'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Carrito = mongoose.model('Carrito'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');


 

/**
 * Create a Carrito
 */
exports.create = function(req, res) {
  var carrito = new Carrito(req.body);
  carrito.user = req.user;

  carrito.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(carrito);
    }
  });
};

/**
 * Show the current Carrito
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var carrito = req.carrito ? req.carrito.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  carrito.isCurrentUserOwner = req.user && carrito.user && carrito.user._id.toString() === req.user._id.toString();

  res.jsonp(carrito);
};

/**
 * Update a Carrito
 */
exports.update = function(req, res) {
  var carrito = req.carrito;

  carrito = _.extend(carrito, req.body);

  carrito.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(carrito);
    }
  });
};

/**
 * Delete an Carrito
 */
exports.delete = function(req, res) {
  var carrito = req.carrito;

  carrito.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(carrito);
    }
  });
};

/**
 * List of Carritos
 */
exports.list = function(req, res) {
  Carrito.find().sort('-created').populate('user', 'displayName').exec(function(err, carritos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(carritos);
    }
  });
};

/**
 * Carrito middleware
 */
exports.carritoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Carrito is invalid'
    });
  }

  Carrito.findById(id).populate('user', 'displayName').exec(function (err, carrito) {
    if (err) {
      return next(err);
    } else if (!carrito) {
      return res.status(404).send({
        message: 'No Carrito with that identifier has been found'
      });
    }
    req.carrito = carrito;
    next();
  });
};
