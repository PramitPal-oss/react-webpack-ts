// webpack.dev.js (CommonJS)

const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    publicPath: 'auto',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hot: true,
    port: 3001,
    open: true,
    historyApiFallback: true,
    static: './public',
    client: {
      overlay: false,
      // ✅ reconnect should be inside client, not devServer root
      reconnect: 3,
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
