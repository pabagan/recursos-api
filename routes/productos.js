var express = require('express');
var router = express.Router();
var Producto = require('../models/Producto');

// Get Productos
router.get('/', function(req, res, next){
  Producto.find({}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Get Producto
router.get('/:id', function(req, res, next){
  var productoId = req.params.id;
  
  Producto.findById(productoId, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Create Producto
router.post('/crear', function(req, res, next){
  var producto = req.body;
    
  Producto.create(producto, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Producto creado con éxito",
        "producto": result
      });
    }
  });
});

// Update Producto
router.put('/:id', function(req, res, next){
  var producto = req.body;
  var productoId = req.params.id;

  Producto.findByIdAndUpdate(productoId, producto, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Producto actualizado con éxito",
        "producto": result
      });
    }
  });  
});

// Delete Producto
router.delete('/:id', function(req, res, next){
  var producto = req.body;
  var productoId = req.params.id;
  
  Producto.findByIdAndRemove(productoId, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Producto borrado con éxito",
        "producto": result
      });
    }
  });
});

module.exports = router;