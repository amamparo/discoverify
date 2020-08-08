const clientConfig = require('./webpack.client.js');
const serverConfig = require('./webpack.server.js');

module.exports = [
  clientConfig,
  serverConfig
];