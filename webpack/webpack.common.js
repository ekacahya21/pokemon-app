const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [Path.resolve(__dirname, '../src')],
        exclude: [Path.resolve(__dirname, '.../node_modules')],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(jpg|png|svg|jpeg|gif)$/,
        use: 'url-loader',
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                // eslint-disable-next-line no-unused-vars
                getLocalIdent: (context, localIdentName, localName) => {
                  return `${context.context.split(/[/|\\]+/).slice(-1)[0]}__style__${localName}`;
                },
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff(\?.*)?$/,
        include: /fonts/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?.*)?$/,
        include: /fonts/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2',
      },
      {
        test: /\.otf(\?.*)?$/,
        include: /fonts/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype',
      },
      {
        test: /\.ttf(\?.*)?$/,
        include: /fonts/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream',
      },
      { test: /\.eot(\?.*)?$/, include: /fonts/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
      {
        test: /\.svg(\?.*)?$/,
        include: /fonts/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: Path.join(__dirname, `../config/${process.env.NODE_ENV}.env`),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      favicon: Path.join(__dirname, '../src/static/favicon.png'),
      template: Path.join(__dirname, '../src/index.html'),
    }),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      Components: Path.resolve(__dirname, '../src/components'),
      Containers: Path.resolve(__dirname, '../src/containers'),
      Layouts: Path.resolve(__dirname, '../src/layouts'),
      Pages: Path.resolve(__dirname, '../src/pages'),
      Utils: Path.resolve(__dirname, '../src/utils'),
      Domain: Path.resolve(__dirname, '../src/domain'),
      Config: Path.resolve(__dirname, '../config'),
    },
  },
  devServer: {
    inline: true,
    hot: true,
    host: 'localhost',
    port: 3000,
  },
};
