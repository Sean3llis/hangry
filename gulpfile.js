var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var config = require('./webpack.js');
var compiler = webpack(config);


gulp.task('default', ['pack','watch','serve']);

gulp.task('watch', function() {
  gulp.watch(['source/**/*'], ['pack']);
});

gulp.task('pack', function (callback) {
  compiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('serve', function (callback) {
  var server = new WebpackDevServer(compiler, {
    stats: { colors: true }
  })
  .listen(8080, '127.0.0.1', function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log('serving on 8080');
  });
  return server;
  callback();
});
