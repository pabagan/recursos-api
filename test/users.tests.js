// Activate test envirtonment
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require("request");
var should = chai.should();
var expect = chai.expect;
//var asert = chai.asert;
var utils = require('../shared/utils');
var app = require("../app");
var server = app.listen(0);
var port = server.address().port;

// Test Configuration
var API_URL = 'http://localhost:' + port + '/api/users'
var User = require('../models/User');

/**
 * Dummy create and update data
 */
var DEMO_DOCUMENT = {
  _id: "5892609064909643fb7e5e62",
  email: "user@gmail.com", 
  name: "Mr User", 
  password: "pass",
  phone: "+34670588330", 
  role: "user"
}

var DEMO_DOCUMENT_UPDATE = {
  email: "user_2@gmail.com", 
  name: "Mr Updated Username", 
  password: "otherpass",
  phone: "+340707070", 
  role: "admin"
}

// chay http middleware
chai.use(chaiHttp);

/**
 * 
 * Start testing!! Go ahead!
 * 
 */

/**
 * Check server errors.
 */
describe("Users testing", function() {
  it("Check if server is delivering with no errors", function(done) {
    request(API_URL, function(err, response, body) {
      if (err) done(err);
      //var payload = JSON.parse(body);
      //assert.equal(typeof payload, "object");
      done();
    });
  });
});

/**
 * Reset test DB collection.
 */
describe("Users collection reset", function() {
  it("Clean Users collection", function(done) {
    User.remove({}, function(err, response, body) {
      if (err) done(err);
      
      User.find({}, function(err, result){
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
describe("Users CRUD API test:", function() {
  // Create
  it('Create new Users with DEMO_DOCUMENT values', (done) => {
    chai.request(API_URL)
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

  // Read
  it('Read created Users', (done) => {
    chai.request(API_URL)
      .get('/' + DEMO_DOCUMENT._id)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.data._id, DEMO_DOCUMENT._id);
        res.body.data.should.be.a('object');
        
        // Check all properties are updated 
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

  // Update
  it('Update created Users with DEMO_DOCUMENT_UPDATE values', (done) => {
    chai.request(API_URL)
      .put('/' + DEMO_DOCUMENT._id)
      .send(DEMO_DOCUMENT_UPDATE)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are updated 
        // with provided value.
        for (var property in DEMO_DOCUMENT_UPDATE) {
          if(property == "password"){
            utils.bcryptCompare(DEMO_DOCUMENT_UPDATE[property], res.body.data[property], function(error, match){
              if (error) done(err);  
            });
          } else {
            res.body.data.should.have.property(property).eql(DEMO_DOCUMENT_UPDATE[property]);
          }
        }

        done();
      });    
  });

  // Delete
  it('Delete created Users', (done) => {
    chai.request(API_URL)
      .delete('/' + DEMO_DOCUMENT._id)
      .send(DEMO_DOCUMENT_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User deleted!');
        done();
      });    
  });
});