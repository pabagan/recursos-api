var records = [
    { id: 1, username: 'jack', token: '123456789', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', token: 'abcdefghi', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

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

exports.findByToken = function(token, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.token === token) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
