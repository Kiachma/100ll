/**
 * Created by eaura on 2015-06-26.
 * Gulp file that handles file validation
 */
var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes');

//Loads package.json
var packageJSON  = require('../../package');
//Loads jsHintconfig from package json
var jshintConfig = packageJSON.jshintConfig;

// Don't try to lookup jsHint from jshintrc
jshintConfig.lookup = false;

/**
 * Validates application javascript files
 * @returns {Stream} Validated *.js files
 */
pipes.validatedScripts = function() {
  return gulp.src(config.appFiles.js)
    .pipe(plugins.jshint(jshintConfig))
};

/**
 * Validates application test files
 * @returns {Stream} Validated *.spec.js files
 */
pipes.validateTests = function() {
  return gulp.src(config.appFiles.jsunit)
    .pipe(plugins.jshint(jshintConfig))
};

/**
 * Validates application gulp files
 * @returns {Stream} Validated gulp files
 */
pipes.validateGulp = function() {
  return gulp.src(config.gulpfiles)
    .pipe(plugins.jshint(jshintConfig))
};

/**
 * Validates application *.html files
 * @returns {Stream} Validated *.html files
 */
pipes.validateHTML = function() {
  return gulp.src(config.appFiles.html,config.appFiles.index)
    .pipe(plugins.htmlhint({
      "doctype-first": false,
    }))
    .pipe(plugins.htmlhint.reporter());
};

gulp.task('validate-scripts', pipes.validatedScripts);

gulp.task('validate-tests', pipes.validateTests);

gulp.task('validate-gulp', pipes.validateGulp);

gulp.task('validate-html', pipes.validateHTML);
