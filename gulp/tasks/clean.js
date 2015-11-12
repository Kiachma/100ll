/**
 * Created by eaura on 2015-06-27.
 * Gulp file that handles cleaning directories
 */
var gulp = require('gulp'),
  del = require('del'),
  Q=require('q'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes');

// removes all compiled production files
gulp.task('clean-prod', function() {
  var deferred = Q.defer();
  del(config.prodDir, function() {
    deferred.resolve();
  });
  return deferred.promise;
});
