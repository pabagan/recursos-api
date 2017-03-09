var express = require('express');
var router = express.Router();

// Get Users
router.get('/', function(req, res, next){
  res.json({status: 200});
});