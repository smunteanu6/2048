const path = require('path');

module.exports = {
  entry: './public/src/js/App.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'custom_modules')
    }
  }
};