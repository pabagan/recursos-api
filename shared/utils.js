var bcrypt = require('bcrypt');
const bcryptSalt = 10;

/**
 * Bcrypt create hash
 */
module.exports.bcryptHash = function(plainText, cb){
  bcrypt.hash(plainText, bcryptSalt, function(err, hash) {
    cb(err, hash);
  });
}

/**
 * Bcrypt compare
 */
module.exports.bcryptCompare = function(plainText, hashedText, cb){
  bcrypt.compare(plainText, hashedText, function(err, match){
    cb(err, match);
  });
}