// Activate test envirtonment
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require("request");
var should = chai.should();
var expect = chai.expect;
//var asert = chai.asert;
var utils = require('../utils');
var app = require("../app");
var server = app.listen(0);
var port = server.address().port;

// Test Configuration
var MODEL = 'Users'
var API_URL = 'http://localhost:' + port + '/api/authenticate'
var API_USER = 'http://localhost:' + port + '/api/users'
var Model = require('../models/User');

/**
 * Dummy create and update data
 */
var DEMO_DOCUMENT = {
  _id: "5892609064909643fb7e5e62",
  email: "user@gmail.com", 
  name: "Mr User", 
  password: "pass",
  phone: "+34670588330", 
  user: "user"
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
describe(MODEL + " collection reset", function() {
  it("Clean " + MODEL + " collection", function(done) {
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
describe("Create fake user:", function() {
  // Create
  it('Create user with DEMO_DOCUMENT values', (done) => {
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
describe("Authenticate fake user:", function() {
  // OK
  it('Authenticate OK', (done) => {
    chai.request(API_URL)
      .post('/')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);;
        res.body.should.have.property('message').eql('User authenticated! Yeah!');
        res.body.should.have.property('token');
        done();
      });
  });

  // KO
  it('Authenticate KO', (done) => {
    DEMO_DOCUMENT.password = 'badpass';
    chai.request(API_URL)
      .post('/')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(false);;
        res.body.should.have.property('message').eql('Authentication failed. Wrong password.');
        res.body.should.not.have.property('token');
        done();
      });
  });
});