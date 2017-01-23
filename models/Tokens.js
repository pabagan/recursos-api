// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// added at app.js
//mongoose.connect(process.env.CHOCOPOLEN_MLAB);

// create a schema
var tokenSchema = new Schema({
  token:  { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, unique: true }
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

var Token = mongoose.model('Token', tokenSchema);

module.exports = Token;