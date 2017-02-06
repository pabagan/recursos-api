// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var utils =require('../shared/utils');

// create a schema
var UserSchema = new Schema({
  name: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: String, 
  phone: String, 
  user: {
    type: String, 
    default: 'user',
    enum: ['user', 'admin'],
    required: [true, 'Add user role'],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
},
{
  versionKey: false // avoid mongoose automatic '__v' field
});

UserSchema.pre('save', function(next) {
  var user = this;
  
  if (!user.isModified('password')) {
    return next();
  }

  utils.bcryptHash(user.password, function(err, hash){
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;