'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Carrito = mongoose.model('Carrito'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  carrito;

/**
 * Carrito routes tests
 */
describe('Carrito CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Carrito
    user.save(function () {
      carrito = {
        name: 'Carrito name'
      };

      done();
    });
  });

  it('should be able to save a Carrito if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Carrito
        agent.post('/api/carritos')
          .send(carrito)
          .expect(200)
          .end(function (carritoSaveErr, carritoSaveRes) {
            // Handle Carrito save error
            if (carritoSaveErr) {
              return done(carritoSaveErr);
            }

            // Get a list of Carritos
            agent.get('/api/carritos')
              .end(function (carritosGetErr, carritosGetRes) {
                // Handle Carritos save error
                if (carritosGetErr) {
                  return done(carritosGetErr);
                }

                // Get Carritos list
                var carritos = carritosGetRes.body;

                // Set assertions
                (carritos[0].user._id).should.equal(userId);
                (carritos[0].name).should.match('Carrito name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Carrito if not logged in', function (done) {
    agent.post('/api/carritos')
      .send(carrito)
      .expect(403)
      .end(function (carritoSaveErr, carritoSaveRes) {
        // Call the assertion callback
        done(carritoSaveErr);
      });
  });

  it('should not be able to save an Carrito if no name is provided', function (done) {
    // Invalidate name field
    carrito.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Carrito
        agent.post('/api/carritos')
          .send(carrito)
          .expect(400)
          .end(function (carritoSaveErr, carritoSaveRes) {
            // Set message assertion
            (carritoSaveRes.body.message).should.match('Please fill Carrito name');

            // Handle Carrito save error
            done(carritoSaveErr);
          });
      });
  });

  it('should be able to update an Carrito if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Carrito
        agent.post('/api/carritos')
          .send(carrito)
          .expect(200)
          .end(function (carritoSaveErr, carritoSaveRes) {
            // Handle Carrito save error
            if (carritoSaveErr) {
              return done(carritoSaveErr);
            }

            // Update Carrito name
            carrito.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Carrito
            agent.put('/api/carritos/' + carritoSaveRes.body._id)
              .send(carrito)
              .expect(200)
              .end(function (carritoUpdateErr, carritoUpdateRes) {
                // Handle Carrito update error
                if (carritoUpdateErr) {
                  return done(carritoUpdateErr);
                }

                // Set assertions
                (carritoUpdateRes.body._id).should.equal(carritoSaveRes.body._id);
                (carritoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Carritos if not signed in', function (done) {
    // Create new Carrito model instance
    var carritoObj = new Carrito(carrito);

    // Save the carrito
    carritoObj.save(function () {
      // Request Carritos
      request(app).get('/api/carritos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Carrito if not signed in', function (done) {
    // Create new Carrito model instance
    var carritoObj = new Carrito(carrito);

    // Save the Carrito
    carritoObj.save(function () {
      request(app).get('/api/carritos/' + carritoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', carrito.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Carrito with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/carritos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Carrito is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Carrito which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Carrito
    request(app).get('/api/carritos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Carrito with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Carrito if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Carrito
        agent.post('/api/carritos')
          .send(carrito)
          .expect(200)
          .end(function (carritoSaveErr, carritoSaveRes) {
            // Handle Carrito save error
            if (carritoSaveErr) {
              return done(carritoSaveErr);
            }

            // Delete an existing Carrito
            agent.delete('/api/carritos/' + carritoSaveRes.body._id)
              .send(carrito)
              .expect(200)
              .end(function (carritoDeleteErr, carritoDeleteRes) {
                // Handle carrito error error
                if (carritoDeleteErr) {
                  return done(carritoDeleteErr);
                }

                // Set assertions
                (carritoDeleteRes.body._id).should.equal(carritoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Carrito if not signed in', function (done) {
    // Set Carrito user
    carrito.user = user;

    // Create new Carrito model instance
    var carritoObj = new Carrito(carrito);

    // Save the Carrito
    carritoObj.save(function () {
      // Try deleting Carrito
      request(app).delete('/api/carritos/' + carritoObj._id)
        .expect(403)
        .end(function (carritoDeleteErr, carritoDeleteRes) {
          // Set message assertion
          (carritoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Carrito error error
          done(carritoDeleteErr);
        });

    });
  });

  it('should be able to get a single Carrito that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Carrito
          agent.post('/api/carritos')
            .send(carrito)
            .expect(200)
            .end(function (carritoSaveErr, carritoSaveRes) {
              // Handle Carrito save error
              if (carritoSaveErr) {
                return done(carritoSaveErr);
              }

              // Set assertions on new Carrito
              (carritoSaveRes.body.name).should.equal(carrito.name);
              should.exist(carritoSaveRes.body.user);
              should.equal(carritoSaveRes.body.user._id, orphanId);

              // force the Carrito to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Carrito
                    agent.get('/api/carritos/' + carritoSaveRes.body._id)
                      .expect(200)
                      .end(function (carritoInfoErr, carritoInfoRes) {
                        // Handle Carrito error
                        if (carritoInfoErr) {
                          return done(carritoInfoErr);
                        }

                        // Set assertions
                        (carritoInfoRes.body._id).should.equal(carritoSaveRes.body._id);
                        (carritoInfoRes.body.name).should.equal(carrito.name);
                        should.equal(carritoInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Carrito.remove().exec(done);
    });
  });
});
