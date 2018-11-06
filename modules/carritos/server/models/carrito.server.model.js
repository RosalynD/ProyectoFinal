'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Carrito Schema
 */
var CarritoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  cart: {
    type: Object,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  }
});

mongoose.model('Carrito', CarritoSchema);
