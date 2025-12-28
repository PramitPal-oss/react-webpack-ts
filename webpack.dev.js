// webpack.dev.js (CommonJS)

const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hot: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
    static: [
      {
        directory: path.resolve(__dirname, '.federation'),
        publicPath: '/federation-types',
      },
      {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
    ],
    devMiddleware: { writeToDisk: true },
    headers: {
      'Access-Control-Allow-Origin': '*', // ✅ Important for CORS
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      // CSS MODULES
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              esModule: false,
            },
          },
        ],
      },

      // GLOBAL CSS
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      // SCSS MODULES
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              esModule: false,
            },
          },
          'sass-loader',
        ],
      },

      // GLOBAL SCSS
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [new Dotenv()],
});
