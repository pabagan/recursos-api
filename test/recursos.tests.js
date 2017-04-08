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
var API_URL = 'http://localhost:' + port + '/api/recursos'
var Recurso = require('../models/Recurso');

// Dummy create and update data
var MODEL_MOCK = require('../models/Recurso.mock');
var MODEL_MOCK_UPDATE = {
  "image": "http://placehold.it/980x640",
  "name": "Demo recurso updated",
  "shortDescription": "Short Description updated",
  "longDescription": "Long Description updated",
  "category": "social",
  "street": "Arabista, 00",
  "state": "Sevilla",
  "city": "Dos Hermanas",
  "phone": "678493201",
  "email": "other@gmail.com",
  "website": "www.demosite-updated.com",
  "loc": { 
    "type": "Point",
    "coordinates": [-3.97, 20.77]
  },
  "status": "publish"
}

// chay http middleware
chai.use(chaiHttp);

// Test CRUD
describe("Recurso CRUD", function() {
  before('clean test db', function(done) {
    Recurso.remove({}, function(err, response, body) {
      if (err) done(err);
      
      Recurso.find({}, function(err, result){
        if (err) done(err);

        assert.equal(result.length, 0);
        done();
      });
    });
  });  

  // Create
  it('should create recurso', (done) => {
    chai.request(API_URL)
      .post('/')
      .send(MODEL_MOCK)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are added 
        // with provided value.
        for (var property in MODEL_MOCK) {
          res.body.data.should.have.property(property).eql(MODEL_MOCK[property]);
        }

        done();
      });
  });

  // Read
  it('should read recurso', (done) => {
    chai.request(API_URL)
      .get('/' + MODEL_MOCK._id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        assert.equal(res.body.data._id, MODEL_MOCK._id);
        
        // Check all properties are updated 
        // with provided value.
        for (var property in MODEL_MOCK) {
          res.body.data.should.have.property(property).eql(MODEL_MOCK[property]);
        }
        done();
      });
  });

  // Update
  it('should update recurso', (done) => {
    chai.request(API_URL)
      .put('/' + MODEL_MOCK._id)
      .send(MODEL_MOCK_UPDATE)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are updated 
        // with provided value.
        for (var property in MODEL_MOCK_UPDATE) {
          res.body.data.should.have.property(property).eql(MODEL_MOCK_UPDATE[property]);
        }

        done();
      });    
  });

  // Delete
  it('should delete recurso', (done) => {
    chai.request(API_URL)
      .delete('/' + MODEL_MOCK._id)
      .send(MODEL_MOCK_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Recurso deleted');
        done();
      });    
  });
});