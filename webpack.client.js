const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, '.build', 'client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(s?)css$/i,
        use: [
          'style-loader',
          'css-loader',
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
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
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
    contentBase: './.build/client',
    watchContentBase: true
  }
};