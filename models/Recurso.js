// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productoSchema = new Schema({
  image: { type: String, unique: true },
  name: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  category: {
    type: String, 
    enum: ['sanitario', 'formativo', 'juventud', 'ocio', 'social', 'laboral'],
    required: [true, 'Categoría no existe'],
  },
  street: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  loc: {
    type: { type: String },
    coordinates: [Number],
    // support all GeoJSON types
    //coordinates: [],
  },
  status: {
    type: String, 
    enum: ['published', 'pending'],
    default: 'pending',
    required: [true, 'Categoría no existe'],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,

},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

// Geolocation Index
productoSchema.index({ "loc": "2dsphere" });

var Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;