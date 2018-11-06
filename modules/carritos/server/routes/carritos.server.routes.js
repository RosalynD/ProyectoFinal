'use strict';

/**
 * Module dependencies
 */
var carritosPolicy = require('../policies/carritos.server.policy'),
  carritos = require('../controllers/carritos.server.controller');

module.exports = function(app) {
  // Carritos Routes
  app.route('/api/carritos').all(carritosPolicy.isAllowed)
    .get(carritos.list)
    .post(carritos.create);

  app.route('/api/carritos/:carritoId').all(carritosPolicy.isAllowed)
    .get(carritos.read)
    .put(carritos.update)
    .delete(carritos.delete);

  // Finish by binding the Carrito middleware
  app.param('carritoId', carritos.carritoByID);
};
