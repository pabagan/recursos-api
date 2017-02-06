var express = require('express');
var config = require('../config/config');
var utils =require('../shared/utils');
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
      res.status(401);
      res.json({ 
        success: false, 
        message: 'Authentication failed. Wrong user or password.' 
      });
    // user exits
    } else if (user) {
      // ... and password match
      utils.bcryptCompare(req.body.password, user.password, function(err, match) {
        // bcrypt not match
        if (!match) {
          res.status(401);
          res.json({ 
            success: false, 
            message: 'Authentication failed. Wrong user or password.' 
          });
        } else {
          // jwt token
          var token = jwt.sign({
            data: user
          }, ''+req.app.get('superSecret'), { expiresIn: '12h' });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'User authenticated! Yeah!',
            token: token
          });
        }   
      });
    }
  })
});

router.post('/token', function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log('--------------------------------------');
  console.log('--------------------------------------');
  console.log('---------- ver si esta ok ------------');
  console.log('--------------------------------------');
  console.log('--------------------------------------');
  console.log('--------------------------------------');
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
    if (err) {
      res.status(401);
      res.json({ 
        success: false, 
        message: 'Failed to authenticate token.' 
      });
    } else {
      res.json({ 
        success: true, 
        message: 'Token authenticated.' 
      });
    }
  });
});

module.exports = router;