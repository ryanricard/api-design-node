var app = require('./server');
var Q = require('q');
var request = require('supertest');
var expect = require('chai').expect;

// TODO: make tests for the other CRUD routes
// DELETE, POST, PUT, GET ONE
// to run the test type mocha server/specs.js

describe('[LIONS]', function(){
  var deferred = Q.defer();
  var ready = deferred.promise;
  var mock = { foo: 'bar' };

  before(function() {
    request(app)
      .post('/lions')
      .send({ foo: 'bar' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        mock = resp.body;
        deferred.resolve();
      })
  });

  it('should get all lions', function(done) {
    ready.then(function(){
      request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('array');
          done();
        })
    });
  });

  it('should create a lion', function(done) {
    ready.then(function() {
      request(app)
        .post('/lions')
        .send({ foo: 'bar' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body.id).to.be.defined;
          done();
        })
    });
  });

  it('should get a lion', function(done) {
    ready.then(function() {
      request(app)
        .get('/lions/' + mock.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body).to.eql(mock);
          done();
        })
    });
  });

  it('should update a lion', function(done) {
    ready.then(function() {
      mock.foo = 'blah';
      request(app)
        .put('/lions/' + mock.id)
        .send(mock)
        .end(function(err, resp) {
          expect(resp.body).to.be.an('object');
          expect(resp.body).to.eql(mock);
          done();
        })
    });
  });
});


