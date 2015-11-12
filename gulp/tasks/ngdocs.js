/**
 * Created by eaura on 2015-06-26.
 * Gulp file that handles jsDoc generation
 */

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');


/**
 * Generates ngDocs for all .js files in src/ places them in  docs/
 * @returns {Stream} Doc files
 */
gulp.task('ngdocs', function () {
  var options = {
    html5Mode: false,
    startPage: '/api',
    title: "100ll",
    titleLink: "/docs",
  };
  return gulp.src(config.appFiles.js)
    .pipe(plugins.ngdocs.process(options))
    .pipe(gulp.dest(config.docs));
});


