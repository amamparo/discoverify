const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(s?)css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.RELEASE_NUMBER': JSON.stringify(Date.now())
    }),
    new CopyPlugin({
      patterns: [
        {from: 'public'}
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  devServer: {
    port: 3000,
    writeToDisk: true,
    contentBase: './.build',
    watchContentBase: true
  }
};