var express = require('express');
var config = require('../config/config');
var utils =require('../utils');
var jwt     = require('jsonwebtoken');
var router  = express.Router();
var User = require('../models/User');

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {
  // find the user
  User.findOne({ name: req.body.name }, function(err, user) {
    if (err) throw err;

    // user not exits
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    // user exits
    } else if (user) {
      // ... and password match
      utils.bcryptCompare(req.body.password, user.password, function(err, match) {
        // bcrypt not match
        if (!match) {
          res.json({ 
            success: false, 
            message: 'Authentication failed. Wrong password.' 
          });
        } else {
          // jwt token
          var token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user
          //}, ''+req.app.get('superSecret'));
          }, new Buffer(req.app.get('superSecret'), 'base64'));
          
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'User authenticated! Yeah!',
            token: token
          });
        }   
      });
    }
  });
});

module.exports = router;