// Activate test envirtonment
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require("request");
var jwt     = require('jsonwebtoken');
var should = chai.should();
var expect = chai.expect;
//var asert = chai.asert;
var config = require('../config/config');
var utils = require('../shared/utils');
var app = require("../app");
var server = app.listen(0);
var port = server.address().port;
// Test Configuration
var API_URL = 'http://localhost:' + port + '/api/authenticate'
var API_USER = 'http://localhost:' + port + '/api/users'
var Model = require('../models/User');

/**
 * Dummy create and update data
 */
var DEMO_DOCUMENT = {
  _id: "5892609064909643fb7e5e62",
  email: "user@gmail.com", 
  name: "user", 
  password: "pass",
  phone: "+34670688330", 
  role: "user"
}

// chay http middleware
chai.use(chaiHttp);

/**
 * 
 * Start testing!! Go ahead!
 * 
 */


/**
 * Reset test DB collection.
 */
describe("Users collection reset", function() {
  it("Clean Users collection", function(done) {
    Model.remove({}, function(err, response, body) {
      if (err) done(err);
      
      Model.find({}, function(err, result){
        if (err) done(err);

        assert.equal(result.length, 0);
        done();
      });
    });
  });
});

/*
 * CRUD Test via API with chai-http
 */
describe("Create fake user", function() {
  var token = '';
  // Create
  it('should create user', (done) => {
    chai.request(API_USER)
      .post('/create')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are added 
        // with provided value.
        for (var property in DEMO_DOCUMENT) {
          if(property == "password"){
            utils.bcryptCompare(DEMO_DOCUMENT['password'], res.body.data['password'], function(error, match){
              if (!match) done(err);        
            });
          } else {
            res.body.data.should.have.property(property).eql(DEMO_DOCUMENT[property]);
          }
        }

        done();
      });
  });
});

/*
 * Authenticate user
 */
describe("Authentication", function() {
  // OK
  it('should authenticate OK', (done) => {
    chai.request(API_URL)
      .post('/')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('User authenticated! Yeah!');
        res.body.should.have.property('token');
        
        // Asign token to use in 'Verify jwt token'
        token = res.body.token;
        done();
      });
  });

  // KO
  it('should authenticate KO', (done) => {
    DEMO_DOCUMENT.password = 'badpass';
    chai.request(API_URL)
      .post('/')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Authentication failed. Wrong user or password.');
        res.body.should.not.have.property('token');
        done();
      });
  });

  // verify token
  it('should verify jwt token', (done) => {
    chai.request(API_URL)
      .post('/token')
      .send({token: token})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        done();
      });
  });

  // verify token
  it('should not verify wrong jwt token', (done) => {
    chai.request(API_URL)
      .post('/token')
      .send({token: 'bad token'})
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('success').eql(false);
        done();
      });
  });
});