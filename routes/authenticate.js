var express = require('express');
var jwt     = require('jsonwebtoken');
var router  = express.Router();
var config = require('../config/config');
var app = require('../app');
var User = require('../models/User');

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {

  // find the user
  User.findOne({ name: req.body.name }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ 
          success: false, 
          message: 'Authentication failed. Wrong password.' 
        });
      } else {
        var token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: user
        }, ''+req.app.get('superSecret'));
        
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});

module.exports = router;