var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Get Users
router.get('/', function(req, res, next){
  User.find({}, null, {sort: {date: -1}}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Get User
router.get('/:id', function(req, res, next){
  var userId = req.params.id;
  
  User.findById(userId, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Create User
router.post('/new', function(req, res, next){
  var user = req.body;
  
  User.create(user, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "User creado con éxito",
        "data": result
      });
    }
  });
  /*
  
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if(err){
      res.send('Tenemos problemas para encriptar tu contraseña');
    } else {
      user.password = hash;
      // Create user
    }
  });
   */
});

// Update User
router.put('/:id', function(req, res, next){
  var user = req.body;
  var userId = req.params.id;

  user.updated_at = new Date();

  User.findByIdAndUpdate(userId, user, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "User actualizado con éxito",
        "data": result
      });
    }
  });  
});

// Delete User
router.delete('/:id', function(req, res, next){
  var user = req.body;
  var userId = req.params.id;
  
  User.findByIdAndRemove(userId, function(err, result) {
    if (err) {
      res.send(err);
    } else if (result == null) {
      res.json({
        "info": "El user que intentas borrar ya no existe",
        "data": result
      });
    } else {
      res.json({
        "info": "User borrado con éxito",
        "data": result
      });
    }
  });
});

module.exports = router;
