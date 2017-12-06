let webpack = require('webpack');
let path = require('path');

let SRC_DIR = path.resolve(__dirname, 'src/js'); // source components
let BUILD_DIR = path.resolve(__dirname, 'src/'); // bundle location

module.exports = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
    ],
  }
};
