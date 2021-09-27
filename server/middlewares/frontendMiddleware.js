/* eslint-disable global-require */

module.exports = (app, options) => {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    const webpackConfig = require('../../webpack/webpack.config');
    const addDevMiddlewares = require('./addDevMiddlewares');
    addDevMiddlewares(app, webpackConfig('dev'));
  } else {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  }
};
