var path = require('path');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: {
    hangry: path.resolve(__dirname + '/src/hangry.js')
  },
  output: {
    path: path.resolve('dist/'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'Hangry'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' }
    ]
  },
  cache: true,
  devtool: 'source-map',
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'models': path.join(__dirname, 'src', 'models'),
      'utils': path.join(__dirname, 'src', 'utils.js')
    }
  }
}
