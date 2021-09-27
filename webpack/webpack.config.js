process.traceDeprecation = true;

const WebpackMerge = require('webpack-merge');
const CommonConfig = require('./webpack.common');

module.exports = (env) => {
  const config = env.production ? 'prod' : 'dev';
  /* eslint-disable import/no-dynamic-require, global-require */
  const envConfig = require(`./webpack.${config}`);
  /* eslint-enable import/no-dynamic-require, global-require */
  return WebpackMerge(CommonConfig, envConfig);
};
