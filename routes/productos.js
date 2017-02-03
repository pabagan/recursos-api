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
        "data": result
      });
    }
  });
});

// Update Producto
router.put('/:id', function(req, res, next){
  var producto = req.body;
  var productoId = req.params.id;

  producto.updated_at = new Date();

  Producto.findByIdAndUpdate(productoId, producto, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "info": "Producto actualizado con éxito",
        "data": result
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
    } else if (result == null) {
      res.json({
        "info": "El producto que intentas borrar ya no existe",
        "data": result
      });
    } else {
      res.json({
        "info": "Producto borrado con éxito",
        "data": result
      });
    }
  });
});

module.exports = router;