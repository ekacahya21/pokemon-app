const Path = require('path');
const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: Path.join(__dirname, '../src/main'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js',
  },
  plugins: [
    new Webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: Path.join(__dirname, '../src/static'),
          to: Path.join(__dirname, '../build/src/static'),
        },
        {
          from: Path.join(__dirname, '../src/static/.well-known'),
          to: Path.join(__dirname, '../build/.well-known'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
    }),
    new TerserJSPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
    new CssMinimizerPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 10,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            return `npm.${packageName.replace('@', '')}`;
          },
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
