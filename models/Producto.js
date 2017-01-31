// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// added at app.js
//mongoose.connect(process.env.CHOCOPOLEN_MLAB);

// create a schema
var productoSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  unidad: {
    type: String, 
    default: 'kg',
    enum: ['kg', 'l', 'ud'],
    required: [true, 'Añade la unidad'],
  },
  infoNutricional: {
    calorias: { type: Number, default: 0 },
    grasas: { type: Number, default: 0 },
    grasasSaturadas: { type: Number, default: 0 },
    hidratos: { type: Number, default: 0 },
    hidratosAzucares: { type: Number, default: 0 },
    proteinas: { type: Number, default: 0 },
  },
  metas:  {
    category: [Schema.Types.ObjectId], 
    label: [Schema.Types.ObjectId], 
  },
  descripcion: String,
  rechazo: String, 
  temperatura: Number,
  tolerancia: String, 
  temporada: { type: [Number], default: [1,1,1,1,1,1,1,1,1,1,1,1]},
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

var Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;