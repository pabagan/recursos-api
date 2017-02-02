/**
 * Global configuration
 * 
 * @author @pabagan
 * @param 
 * @return void 
 */
module.exports = {
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