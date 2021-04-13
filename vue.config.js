//vue.config.js
var path = require('path');

module.exports = {
    css: {
     loaderOptions: {
      //pass options to stylus-loader
      stylus: {
       import: [path.resolve(__dirname, 'src/styles/vars')]
      }
     }
    }
   };