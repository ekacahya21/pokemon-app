const Path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    overlay: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  entry: ['webpack-hot-middleware/client?reload=true', Path.join(__dirname, '../src/main')],
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
