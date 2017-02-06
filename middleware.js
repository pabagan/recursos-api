var jwt     = require('jsonwebtoken');
var config  = require('./config/config');

module.exports.jwtVerifyToken = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // check token
  if (token) {
    // jwt verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ 
          success: false, 
          message: 'Failed to authenticate token.' 
        });
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });   
  }
};

/**
 * Auth0 way to API log
 * 
 * @see https://auth0.com/blog/angular-2-authentication/
 * @return  object jwt
module.exports.authCheck = jwt({
    secret: new Buffer(config.auth0.secret, 'base64'),
    audience: config.auth0.clientId,
});
 */

// catch 404 and forward to error handler
module.exports.err404 = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// Errors
module.exports.errors = function(req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};