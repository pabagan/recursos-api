var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Get Users
router.get('/', function(req, res, next){
  User.find({}, '_id email name phone user', {sort: {date: -1}}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Create User
router.post('/create', function(req, res, next){
  var user = req.body;
  
  User.create(user, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "message": "User created!",
        "data": result
      });
    }
  });
});

router.route('/:id')
  // Get User
  .get(function(req, res, next) {
    var userId = req.params.id;
    
    User.findById(userId, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  })

  // Delete User
  .delete(function(req, res, next) {
    var user = req.body;
    var userId = req.params.id;
    
    User.findByIdAndRemove(userId, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
        res.json({
          "message": "User not exist",
          "data": result
        });
      } else {
        res.json({
          "message": "User deleted!",
          "data": result
        });
      }
    });
  })

  // Update User
  .put(function(req, res, next) {
    var userReq = req.body;
    var userId = req.params.id;

    userReq.updated_at = new Date();

    // use findById method to have access to mongoose 
    // pre triggers.
    User.findById(userId, function(err, user) {
      if (err)
        res.send(err);

      for (var arg in userReq){
        user[arg] = userReq[arg]
      }

      // save the updated user
      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ 
          message: 'User updated!', 
          data: user
        });
      });
    });
  });

module.exports = router;
