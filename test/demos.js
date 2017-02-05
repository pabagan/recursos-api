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
var MODEL = 'Productos'
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
describe(MODEL + " testing", function() {
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
describe(MODEL + "collection reset", function() {
  it("Clean" + MODEL + " collection", function(done) {
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
describe(MODEL + " CRUD API test:", function() {
  // Create
  it('Create new ' + MODEL + 'with DEMO_DOCUMENT values', (done) => {
    chai.request(API_URL)
      .post('/crear')
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
  it('Read created ' + MODEL, (done) => {
    chai.request(API_URL)
      .get('/' + DEMO_DOCUMENT._id)
      .end((err, res) => {
        res.should.have.status(200);
        assert.equal(res.body._id, DEMO_DOCUMENT._id);
        res.body.should.be.a('object');
        
        // Check all properties are updated 
        // with provided value.
        for (var property in DEMO_DOCUMENT) {
          res.body.should.have.property(property).eql(DEMO_DOCUMENT[property]);
        }
        done();
      });
  });

  // Update
  it('Update created ' + MODEL + 'with DEMO_DOCUMENT_UPDATE values', (done) => {
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
  it('Delete created ' + MODEL, (done) => {
    chai.request(API_URL)
      .delete('/' + DEMO_DOCUMENT._id)
      .send(DEMO_DOCUMENT_UPDATE)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Producto borrado con éxito');
        done();
      });    
  });

});

/*

describe('Test partners_token', function(){
  it('create 10 partners', function(done){
    partnerCtrl.createPartner('Maya Doe', 'abcd', 1, function(err, res){});
    partnerCtrl.createPartner('Pizguato', 'abce', 0, function(err, res){});
    partnerCtrl.createPartner('Adolfo Doe', 'abcf', 0, function(err, res){});
    partnerCtrl.createPartner('Eulalia Doe', 'abcg', 1, function(err, res){});
    partnerCtrl.createPartner('Pepe Doe', 'abch', 1, function(err, res){});
    partnerCtrl.createPartner('Muxaxo Doe', 'abci', 1, function(err, res){});
    partnerCtrl.createPartner('Antoine Doe', 'abcj', 1, function(err, res){});
    partnerCtrl.createPartner('Potro Doe', 'abck', 1, function(err, res){});
    partnerCtrl.createPartner('Sven Doe', 'abcl', 1, function(err, res){});
    done();
  });
  
  it('count 10 partners', function(done){
    partnerCtrl.countPartners( function(err, result){
      assert.equal(result, 9); // counting 0
      done();
    });
  });

  it('get all parters with its properties', function(done){
    partnerCtrl.getPartners( function(err, result){
      // check length
      assert.equal(result.length, 9); // counting 0
      // check properties
      for (var i = 0; i < partnerCtrl.ATTRS.lenght; i++) {
        result[0].should.have.property(partnerCtrl.ATTRS[i]);
      }
      
      //assert.equal(result, 9); // counting 0
      done();
    });
  });

  it('get partnert by id (id_partner: 1)', function(done){
    var id = 1;
    partnerCtrl.getPartner(id, function(err, result){
      result[0].should.have.property('partner_id');
      done();
    });
  });

  it('update partner_name: 1 )', function(done){
    var id = 1;
    partnerCtrl.updatePartner(id, {partner_name: 'Polakito Jones'}, function(err, result){});
    partnerCtrl.getPartner(id, function(err, result){
      assert.equal(result[0].partner_name, 'Polakito Jones');
    });
    
    done();
  });


  it('Authenticate OK (partner_token: abcd)', function(done){
    var token = 'abcd';
    partnerCtrl.getPartnerByToken(token, function(err, result){
      result[0].should.have.property('partner_token');
      done();
    });
  });

  it('Authenticate KO (partner_token: x?xx)', function(done){
    var token = 'x?xx';
    partnerCtrl.getPartnerByToken(token, function(err, result){
      assert.equal(result[0], undefined);
      done();
    });
  });

  // Breaks ID logic and TRUNCATE table 
  // still buggy so leave this test 
  // unused.
  //it('delete partner_id: 9 )', function(done){
    //var id = 9;
    //partnerCtrl.deletePartner(id, function(err, result){
      //assert.equal(result[0].partner_name, 'Polakito Jones');
    //});

    //partnerCtrl.getPartner(id, function(err, result){
      //assert.equal(result[0], undefined);
    //});
    
    //done();
  //});
});
 */