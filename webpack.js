exports.dev = {
  entry: {
    hangry: './source/hangry.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Hangry'
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

exports.prod = {
  entry: './source/index.js',
  output: {
    path: 'dist',
    filename: '[name].js',
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
