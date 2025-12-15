// webpack.common.js (CommonJS)

const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { ModuleFederationPlugin } = webpack.container;

const federationConfig = {
  name: 'components',
  filename: 'remoteEntry.js',
  exposes: {
    './RCButton': './src/libs/atoms/button/Button.tsx',
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: false },
    'react-dom': { singleton: true, eager: true, requiredVersion: false },
  },
};

module.exports = {
  entry: './src/index.tsx',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(federationConfig),
    new FederatedTypesPlugin({
      federationConfig,
      disableTypeCompilation: false,
      disableDownloadingRemoteTypes: false,
      compiler: 'tsc', // or 'vue-tsc' if using Vue
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon/webpackFavicon.png',
    }),
  ],
};
