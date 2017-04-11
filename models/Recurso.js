// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var recursoSchema = new Schema({
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
    required: [true, 'Estatus fuera de rango'],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,

},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

// Geolocation Index
recursoSchema.index({ "loc": "2dsphere" });

var Recurso = mongoose.model('recursos', recursoSchema);

module.exports = Recurso;