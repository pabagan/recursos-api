var express = require('express');
var router = express.Router();
var Token = require('../models/Tokens');

// Create Token
router.post('/new', function(req, res, next){
  var token = req.body;
    
  Token.create(token, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Token creado con éxito",
        "token": result
      });
    }
  });
});

// Delete Token
router.delete('/reset', function(req, res, next){
  var tokenId = req.body._id;
  
  Token.findByIdAndRemove(tokenId, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Token borrado con éxito",
        "token": result
      });
    }
  });
});

module.exports = router;