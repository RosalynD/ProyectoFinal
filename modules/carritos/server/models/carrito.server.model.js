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
  titularTarjeta: {
    type: Object,
    required: true
  },
  fechaVencimiento: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }
});

CarritoSchema.statics.seed = seed;


mongoose.model('Carrito', CarritoSchema);

//* Seeds the Product collection with document (Product)
//* and provided options.

function seed(doc, options) {
  var Carrito = mongoose.model('Carrito');

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
        Carrito
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
            message: chalk.yellow('Database Seeding: Carrito\t' + doc.name + ' skipped')
          });
        }

        var carrito = new Carrito(doc);

        article.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Carrito\t' + carrito.titularTarjeta + ' added'
          });
        });
      });
    }
  });
}

