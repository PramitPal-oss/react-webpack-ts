// webpack.common.js (CommonJS)
const { FederatedTypesPlugin } = require('@module-federation/typescript');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { ModuleFederationPlugin } = webpack.container;

const federationConfig = {
  name: 'remote_app',
  filename: 'remoteEntry.js',
  remotes: {
    components: 'components@http://localhost:3000/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: false, requiredVersion: false },
    'react-dom': { singleton: true, eager: false, requiredVersion: false },
    'react-hot-toast': {
      singleton: true,
      requiredVersion: false,
    },
  },
};

module.exports = {
  entry: './src/index.tsx',

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
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
      compiler: 'tsc',
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
