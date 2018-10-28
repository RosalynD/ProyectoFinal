'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  //path = require('path'),
  //config = require(path.resolve('./config/config')),
  //chalk = require('chalk');


/**
 * Producto Schema
 */
var ProductoSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  category: {
    type: String,
    default: '',
    required: 'Please enter the category',
    trim: true
  },
  subcategory: {
    type: String,
    default: '',
    required: 'Please enter the subcategory',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please enter the description',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    required: 'Please enter the price',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

//ProductoSchema.statics.seed = seed;


mongoose.model('Producto', ProductoSchema);

/*
* Seeds the Product collection with document (Product)
* and provided options.

function seed(doc, options) {
  var Producto = mongoose.model('Producto');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Producto
          .findOne({
            name: doc.name
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Producto\t' + doc.name + ' skipped')
          });
        }

        var producto = new Producto(doc);

        article.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Producto\t' + producto.name + ' added'
          });
        });
      });
    }
  });
}
*/
