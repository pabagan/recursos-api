var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

// Get Categorys
router.get('/', function(req, res, next){
  Category.find({}, null, {sort: {date: -1}}, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Create Category
router.post('/create', function(req, res, next){
  var category = req.body;
    
  Category.create(category, function(err, result){
    if (err) {
      res.send(err);
    } else {
      res.json({
        "message": "Category created!",
        "data": result
      });
    }
  });
});

router.route('/:id')
  .get(function(req, res, next) {
    var categoryId = req.params.id;
    
    Category.findById(categoryId, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  })

  // Delete Category
  .delete(function(req, res, next) {
    var category = req.body;
    var categoryId = req.params.id;
    
    Category.findByIdAndRemove(categoryId, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
        res.json({
          "message": "Category not exist",
        });
      } else {
        res.json({
          "message": "Category deleted",
          "data": result
        });
      }
    });
  })

  // Update Category
  .put(function(req, res, next) {
    var category = req.body;
    var categoryId = req.params.id;

    category.updated_at = new Date();

    Category.findByIdAndUpdate(categoryId, category, {new: true}, function(err, result) {
      if (err) {
        res.send(err);
      } else if (result == null) {
        res.status(400);
        res.json({
          "message": "Category not exist",
        });
      } else {
        res.json({
          "message": "Category updated",
          "data": result
        });
      }
    });
  });

module.exports = router;