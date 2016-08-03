var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var config = require('./webpack.config.js');


gulp.task('default', function(callback) {
  console.log('config ~~>', config);

  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  })
});
