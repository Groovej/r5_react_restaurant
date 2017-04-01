var path = require('path');
const config = require('./webpack.common.config');

config.output = {
  path: path.resolve(__dirname,'../app/assets/javascripts/generated'),
  filename: 'client-bundle.js'
};

module.exports = config;
