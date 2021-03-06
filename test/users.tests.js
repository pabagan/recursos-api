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

// Dummy create and update data
var MODEL_MOCK = require('../models/User.mock');
var MODEL_MOCK_UPDATE = {
  email: "user_2@gmail.com", 
  name: "Mr Updated Username", 
  password: "otherpass",
  phone: "+340707070", 
  role: "admin"
}

// chay http middleware
chai.use(chaiHttp);

// Test CRUD
describe("Users CRUD", function() {
  // clean test DB
  before('clean test db', function(done) {
    // runs before all tests in this block
    User.remove({}, function(err, response, body) {
      if (err) done(err);
      
      User.find({}, function(err, result){
        if (err) done(err);

        assert.equal(result.length, 0);
        done();
      });
    });
  });

  // Create
  it('should create user', (done) => {
    chai.request(API_URL)
      .post('/create')
      .send(MODEL_MOCK)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        
        // Check all properties are added 
        // with provided value.
        for (var property in MODEL_MOCK) {
          if(property == "password"){
            utils.bcryptCompare(MODEL_MOCK['password'], res.body.data['password'], function(error, match){
              if (!match) done(err);        
            });
          } else {
            res.body.data.should.have.property(property).eql(MODEL_MOCK[property]);
          }
        }

        done();
      });
  });

  // Read
  it('should read user', (done) => {
    chai.request(API_URL)
      .get('/' + MODEL_MOCK._id)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body.data._id, MODEL_MOCK._id);
        res.body.data.should.be.a('object');
        
        // Check all properties are updated 
        // with provided value.
        for (var property in MODEL_MOCK) {
          if(property == "password"){
            utils.bcryptCompare(MODEL_MOCK['password'], res.body.data['password'], function(error, match){
              if (!match) done(err);        
            });
          } else {
            res.body.data.should.have.property(property).eql(MODEL_MOCK[property]);
          }
        }
      });
  });

  // Update
  it('should update user', (done) => {
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
          if(property == "password"){
            utils.bcryptCompare(MODEL_MOCK_UPDATE[property], res.body.data[property], function(error, match){
              if (error) done(err);  
            });
          } else {
            res.body.data.should.have.property(property).eql(MODEL_MOCK_UPDATE[property]);
          }
        }

        done();
      });    
  });

  // Delete
  it('should delete user', (done) => {
    chai.request(API_URL)
      .delete('/' + MODEL_MOCK._id)
      .send(MODEL_MOCK_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User deleted!');
        done();
      });    
  });
});