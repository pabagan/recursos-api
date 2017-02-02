// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: String, 
  admin: Boolean, 
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

var User = mongoose.model('User', userSchema);

module.exports = User;