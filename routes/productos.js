var express = require('express');
var router = express.Router();
var Producto = require('../models/Producto');

// Get Productos
router.get('/', function(req, res, next){
  Producto.find({}, null, {sort: {date: -1}}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Create Producto
router.post('/create', function(req, res, next){
  var producto = req.body;
    
  Producto.create(producto, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "message": "Producto created",
        "data": result
      });
    }
  });
});

router.route('/:id')
  .get(function(req, res, next) {
    var productoId = req.params.id;
    
    Producto.findById(productoId, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  })

  // Delete Producto
  .delete(function(req, res, next) {
    var producto = req.body;
    var productoId = req.params.id;
    
    Producto.findByIdAndRemove(productoId, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
        res.json({
          "message": "Producto not exist",
          "data": result
        });
      } else {
        res.json({
          "message": "Producto deleted",
          "data": result
        });
      }
    });
  })
  
  // Update Producto
  .put(function(req, res, next) {
    var producto = req.body;
    var productoId = req.params.id;

    producto.updated_at = new Date();

    Producto.findByIdAndUpdate(productoId, producto, {new: true}, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
      } else {
        res.json({
          "message": "Producto updated",
          "data": result
        });
      }
    });
  });

module.exports = router;