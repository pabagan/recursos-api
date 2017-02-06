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

// Test Configuration
var MODEL = 'Productos'
var API_URL = 'http://localhost:' + port + '/api/productos'
var Model = require('../models/Producto');



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