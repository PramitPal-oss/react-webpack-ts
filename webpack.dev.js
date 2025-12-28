// webpack.dev.js (CommonJS)

const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hot: false, // ❗ IMPORTANT
    liveReload: true,
    port: 3001,
    open: true,
    historyApiFallback: true,
    static: './public',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
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

  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
});
