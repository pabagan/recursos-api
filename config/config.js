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
      test: 3002,
    },
    auth0:{
      secret: 'Xi7LPdq8uryidgTPn7UjZ8WZfnWsQLgcFjYGEwHexSLYH_CYiuE1SrBX5lVU1cDI',
      clientId: 'qsWqArDyjb34uzy4kY6JFdB16jFcbUf0',
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
      'test': 'mongodb://localhost:27017/recursos-jklpq-test',
      'production': 'mongodb://localhost:27017/recursos-jklpq',
      'development': 'mongodb://localhost:27017/recursos-jklpq-dev',
      
      // When authentication is ready ...
      //'production': 'mongodb://pabagan:ak47t3m0m1@localhost:27017/recursos-jklpq',
      //'development': 'mongodb://pabagan:ak47t3m0m1@localhost:27017/recursos-jklpq',
    }
};