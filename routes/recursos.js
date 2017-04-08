var express = require('express');
var router = express.Router();
var Recurso = require('../models/Recurso');

router.route('/')
  // Get Recursos
  .get(function(req, res, next){
    Recurso.find({}, null, {sort: {date: -1}}, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json({
          "data": result
        });
      }
    });
  })
  
  // Create Recurso
  .post(function(req, res, next){
    var recurso = req.body;
      
    Recurso.create(recurso, function(err, result){
      if (err) {
        res.send(err);
      } else {
        res.json({
          "message": "Recurso created",
          "data": result
        });
      }
    });
  });

router.route('/:id')
  .get(function(req, res, next) {
    var recursoId = req.params.id;
    
    Recurso.findById(recursoId, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          "data": result
        });
      }
    });
  })

  // Delete Recurso
  .delete(function(req, res, next) {
    var recurso = req.body;
    var recursoId = req.params.id;
    
    Recurso.findByIdAndRemove(recursoId, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
        res.json({
          "message": "Recurso not exist",
          "data": result
        });
      } else {
        res.json({
          "message": "Recurso deleted",
          "data": result
        });
      }
    });
  })
  
  // Update Recurso
  .put(function(req, res, next) {
    var recurso = req.body;
    var recursoId = req.params.id;

    recurso.updated_at = new Date();

    Recurso.findByIdAndUpdate(recursoId, recurso, {new: true}, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
      } else {
        res.json({
          "message": "Recurso updated",
          "data": result
        });
      }
    });
  });

module.exports = router;