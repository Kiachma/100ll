
var gulp = require('gulp'),
  es = require('event-stream'),
  del = require('del'),
  Q=require('q'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes').pipes;


/**
 * Default task
 * Requires 'serve' to have been run
 * Injects paths to jspm files in index.html's head element
 * @returns {Stream} Index files
 */

gulp.task('default', ['watch','tdd','version','sass'],function(){
  var filesToInject= gulp.src(config.jspmFilesDev,config.generated_css);
  return gulp.src(config.appFiles.index)
    .pipe(plugins.inject(filesToInject,{relative:true}))
    .pipe(gulp.dest('.'));
});
