var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var config = require('./webpack.js').dev;
var compiler = webpack(config);

gulp.task('pack', function(callback) {
  compiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});
