var mongoose = require('mongoose');
var config = require('../config/config');

// connect db depending app state: development, production, test.
var dbUrl = config.database[config.environment];

console.log('-----------------------------------------');
console.log(dbUrl);

mongoose.Promise = Promise; // avoid warning at user update

module.exports = {
    connect: mongoose.connect(dbUrl),
};