var mongoose = require('mongoose');


var MODE = process.env.NODE_ENV || 'development';

// db settings
var db = {
    'production': process.env.CHOCOPOLEN_MLAB,
    'development': process.env.CHOCOPOLEN_MLAB,
};

module.exports = {
    connect: mongoose.connect(db[MODE]),
};