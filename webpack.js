var path = require('path');

function resolve(_path) {
  return path.resolve(__dirname, _path);
}

module.exports = {
  entry: {
    hangry: path.resolve('./source/hangry.js')
  },
  output: {
    path: path.resolve('dist/'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Lol'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
