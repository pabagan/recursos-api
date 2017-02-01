var mongoose = require('mongoose');
var config = require('../config/config');

var dbUrl = config.database[config.environment];

module.exports = {
    connect: mongoose.connect(dbUrl),
};