// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;;
mongoose.connect(process.env.CHOCOPOLEN_MLAB);

// create a schema
var productoSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  unidad: {
    type: String, 
    enum: ['kg', 'l', 'ud'],
    required: [true, 'Añade la unidad'],
  },
  infoNutricional: {
    calorias: Number,
    grasas: Number,
    grasasSaturadas: Number,
    hidratos: Number,
    hidratosAzucares: Number,
    proteinas: Number,
  },
  metas:  {
    category: ObjectId, 
    label: ObjectId, 
  },
  descripcion: String,
  rechazo: String, 
  temperatura: Number,
  tolerancia: String, 
  temporada: Array
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

var Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;