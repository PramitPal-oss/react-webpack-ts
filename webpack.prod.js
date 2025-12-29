// webpack.prod.js (CommonJS)

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: 'auto',
  },

  module: {
    rules: [
      // CSS MODULES
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new Dotenv(),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          plugins: [['mozjpeg', { quality: 70 }], ['pngquant', { quality: [0.6, 0.8] }], ['svgo']],
        },
      }),
    ],
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
  },
});
