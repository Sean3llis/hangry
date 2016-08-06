import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

gulp.task('default', ['watch']);

gulp.task('watch', ['pack', 'serve'], function() {
  gulp.watch(['src/**/*.js'], ['pack']);
});

gulp.task('clean', function() {
  return gulp.src('dist/hangry.js', {read: false}).pipe(clean());
});

gulp.task('pack', function (cb) {
  let compiler = webpack(config);
  compiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    cb();
  });
});

gulp.task('serve', function () {
  let compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
    stats: { colors: true }
  }).listen(8080, '127.0.0.1', function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log('serving on 8080');
  });
  return server;
});
