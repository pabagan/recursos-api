// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var categorySchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: String,
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
  childs: [Schema.Types.ObjectId], 
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;