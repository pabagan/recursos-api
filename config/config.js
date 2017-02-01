/**
 * Global configuration
 * 
 * @author @pabagan
 * @param 
 * @return void 
 */
module.exports = {
    environment: process.env.NODE_ENV || 'development',
    database: {
      'production': process.env.CHOCOPOLEN_MLAB,
      'development': process.env.CHOCOPOLEN_MLAB,
    }
};