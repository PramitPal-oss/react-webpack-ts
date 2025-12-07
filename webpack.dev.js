// webpack.dev.js
import Dotenv from 'dotenv-webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',

  output: {
    filename: 'bundle.js',
    publicPath: 'auto',
  },

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hot: true,
    port: 3002,
    open: true,
    historyApiFallback: true,
    static: './public',
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

      // GLOBAL CSS AND TAILWIND
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
