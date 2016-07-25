/**
 * Created by eaura on 2015-06-26.
 * Gulp file that handles starting a local http server and livereload for development
 */
var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('serve',[
  //'validate-scripts'

],  function() {
  plugins.connect.server({
    root:  __dirname+'/../../',
    livereload: true
  });
});
gulp.task('serve-prod',['prod'],  function(done) {

  plugins.connect.server({
    root:  __dirname+'/../../bin',
  });
  done();
});
