var mongoose = require('mongoose');
var config = require('../config/config');
var dbUrl = config.database[config.environment];

mongoose.Promise = Promise; // avoid warning at user update

module.exports = {
    connect: mongoose.connect(dbUrl),
};