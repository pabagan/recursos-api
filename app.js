var express = require('express');
var config = require('./config/config');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db/db').connect;
var middleware = require('./shared/middleware');

var app = express();

app.set('superSecret', config.secret); // secret variable
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure the Bearer strategy for use by Passport.
//
// The Bearer strategy requires a `verify` function which receives the
// credentials (`token`) contained in the request.  The function must invoke
// `cb` with a user object, which will be set at `req.user` in route handlers
// after authentication.
/*

passport.use(new Strategy( function(token, cb) {
  users.findByToken(token, function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    return cb(null, user);
  });
}));
 */
// jwt verify middleware
// activate token verification loggin to 
// next routes.

// not verified routes
app.use('/', require('./routes/index'));
app.use('/api/authenticate', require('./routes/authenticate'));
app.use('/api/users', require('./routes/users'));

//app.use(middleware.jwtVerifyToken);
app.use('/api/recursos',
        //middleware.jwtVerifyToken,
        // curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
        // curl -v http://127.0.0.1:3000/?access_token=123456789
        //passport.authenticate('bearer', { session: false }), 
        require('./routes/recursos')
      );


// Errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
