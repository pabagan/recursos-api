// Activate test envirtonment
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var request = require("request");
var should = chai.should();
var expect = chai.expect;
//var asert = chai.asert;

var app = require("../app");
var server = app.listen(0);
var port = server.address().port;

var config = require('../config/config');

// Test Configuration
var API_URL = 'http://localhost:' + port + '/api/categories'
var Model = require('../models/Category');

/**
 * Dummy create and update data
 */
var DEMO_DOCUMENT = {
  _id: "5897d246b2a2a04963524510",
  nombre: "Demo category",
  descripcion: "Demo category",
  childs: ["5897d246b2a2a04963524511"]
}

var DEMO_DOCUMENT_UPDATE = {
  nombre: "Demo category updated",
  descripcion: "Demo category updated",
  childs: ["5897d246b2a2a04963524511", "5897d246b2a2a04963524512"]
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
describe("Category testing", function() {
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
describe("Category collection reset", function() {
  it("Clean" + "Category collection", function(done) {
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
describe("Category CRUD API test:", function() {
  // Create
  it('Create new Category with DEMO_DOCUMENT values', (done) => {
    chai.request(API_URL)
      .post('/create')
      .send(DEMO_DOCUMENT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are added 
        // with provided value.
        for (var property in DEMO_DOCUMENT) {
          res.body.data.should.have.property(property).eql(DEMO_DOCUMENT[property]);
        }

        done();
      });
  });

  // Read
  it('Read created Category', (done) => {
    chai.request(API_URL)
      .get('/' + DEMO_DOCUMENT._id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        assert.equal(res.body.data._id, DEMO_DOCUMENT._id);
        
        // Check all properties are updated 
        // with provided value.
        for (var property in DEMO_DOCUMENT) {
          res.body.data.should.have.property(property).eql(DEMO_DOCUMENT[property]);
        }
        done();
      });
  });

  // Update
  it('Update created Category with DEMO_DOCUMENT_UPDATE values', (done) => {
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
          res.body.data.should.have.property(property).eql(DEMO_DOCUMENT_UPDATE[property]);
        }

        done();
      });    
  });

  // Delete
  it('Delete created Category', (done) => {
    chai.request(API_URL)
      .delete('/' + DEMO_DOCUMENT._id)
      .send(DEMO_DOCUMENT_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Category deleted');
        done();
      });    
  });
});