const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = env => {
  return {
    context: resolve('src'),
    entry: './index.js',
    output: {
      filename: 'index.js',
      path: resolve('lib'),
      publicPath: resolve('lib'),
    },
    devtool: env.prod ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'postcss-loader'
            ]
          }),
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 2,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'sass-loader'
            ]
          }),
        },
        {
          test: /\.(png|gif|jpg|svg)$/,
          exclude: /node_modules/,
          use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new BabiliPlugin()
    ]
  };
};