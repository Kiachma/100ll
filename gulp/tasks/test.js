/**
 * Created by eaura on 2015-06-26.
 * Gulp task that handles testing
 */
var gulp = require('gulp-npm-run')(require('gulp')),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes');
var karma = require('karma').server;
var Q = require('q');

/**
 * Starts karma and watches all files (used in development)
 * @returns {*|promise}
 */
pipes.testApp = function(done) {
  var deferred = Q.defer();
  karma.start({
    configFile: __dirname+'/../../karma/karma.conf.js',
    //autoWatch: true
  }, function() {
    done();
  });

};

gulp.task('tdd', pipes.testApp);

/**
 * Runs through all tests once
 */
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname +'/../../karma/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('e2e', ['e2eCI','serve-prod'],function(){
});
