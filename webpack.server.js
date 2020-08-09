require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/server/api.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '.build', 'server'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(process.env.SPOTIFY_CLIENT_ID)
    })
  ],
  resolve: {
    extensions: ['.js']
  }
};