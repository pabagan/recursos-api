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
var API_URL = 'http://localhost:' + port + '/api/productos'
var Model = require('../models/Producto');

/**
 * Dummy create and update data
 */
var DEMO_DOCUMENT = {
  _id: "58860afc79cfe21882894b4b",
  nombre: "Demo producto",
  unidad: "ud",
  calorias: 162,
  grasas: 0,
  grasasSaturadas: 0,
  hidratos: 0.68,
  hidratosAzucares: 0,
  hidratosFibra: 0,
  proteinas: 0.5,
  sodio: 0.5,
  category: ["588609e4c7a92017f1fc5e4d"],
  label: ["588609e4c7a92017f1fc5e5d"],
  descripcion: "Demo producto",
  pais: "ES",
  rechazo: "Roturas y golpes. Fecha de caducidad, Color verde, Presencia de heces, restos de sangre o grietas en cáscara.",
  tolerancia: "±2",
  temporada: [1,1,0,0,0,0,0,0,0,0,1,1]
}

var DEMO_DOCUMENT_UPDATE = {
  nombre: "Demo update",
  unidad: "kg",
  calorias: 0,
  grasas: 100,
  grasasSaturadas: 100,
  hidratos: 70,
  hidratosAzucares: 3,
  hidratosFibra: 4,
  proteinas: 1,
  sodio: 0.2,
  category: ["588609e4c7a92017f1fc5e30"],
  label: ["588609e4c7a92017f1fc5e50"],
  descripcion: "Demo producto nueva",
  pais: "GE",
  rechazo: "Todo bien.",
  tolerancia: "±1",
  temporada: [1,1,1,1,1,1,1,1,1,1,1,1]
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
describe("Productos testing", function() {
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
describe("Productos collection reset", function() {
  it("Clean" + "Productos collection", function(done) {
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
describe("Productos CRUD API test:", function() {
  // Create
  it('Create new Productos with DEMO_DOCUMENT values', (done) => {
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
  it('Read created Productos', (done) => {
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
  it('Update created Productos with DEMO_DOCUMENT_UPDATE values', (done) => {
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
  it('Delete created Productos', (done) => {
    chai.request(API_URL)
      .delete('/' + DEMO_DOCUMENT._id)
      .send(DEMO_DOCUMENT_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Producto deleted');
        done();
      });    
  });
});