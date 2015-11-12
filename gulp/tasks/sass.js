/**
 * Created by eaura on 2015-07-06.
 */
var gulp = require('gulp'),
  es = require('event-stream'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes').pipes;

gulp.task('sass', function () {
  gulp.src(config.appFiles.sassMain)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./'));

});

gulp.task('sassProd', function () {
  gulp.src(config.appFiles.sassMain)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(config.prodDir));

});
