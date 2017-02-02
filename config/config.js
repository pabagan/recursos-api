var path = require('path');
const fs = require('fs');

/**
 * Global configuration
 * 
 * @author @pabagan
 * @param 
 * @return void 
 */
module.exports = {
    ports: {
      default: 3000,
      secure: 3001,
    },
    ssl: {
      key: fs.readFileSync(path.resolve(__dirname,'./ssl-certs/key-localhost.pem')),
      cert: fs.readFileSync(path.resolve(__dirname,'./ssl-certs/localhost.pem')),
    },
    // environment (production || development)
    environment: process.env.NODE_ENV || 'development',
    // secret for authentication
    secret: process.env.SECRET_KEY,
    // database url
    database: {
      'production': process.env.CHOCOPOLEN_MLAB,
      'development': process.env.CHOCOPOLEN_MLAB,
    }
};