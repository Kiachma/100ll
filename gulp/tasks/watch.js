/**
 * Created by eaura on 2015-06-26.
 * Gulp file that handles watch tasks for development
 */

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');

var pipes = require('../utils/pipes');

/**
 * Requires a server to be running and all files to have been validated in order to run
 */
gulp.task('watch',['serve','validate-scripts','validate-html','validate-gulp','validate-tests'], function () {



  // watch app scripts
  //gulp.watch(config.appFiles.js, { interval: 500 },['validate-scripts','test','reload']);

  // watch html
  //gulp.watch(config.appFiles.html, { interval: 500 },['validate-html','reload']);
  // watch gulp
  //gulp.watch(config.gulpfiles, { interval: 500 },['validate-gulp']);

  // watch tests
  //gulp.watch(config.appFiles.jsunit, { interval: 500 },['validate-tests','test'] );

  //watch Sass
  //gulp.watch(config.appFiles.sass, { interval: 500 },['sass','reload']);

});

/**
 * Reload live reload if html or js files have been changed
 */
gulp.task('reload',['version'] ,function () {
  //return gulp.src(config.appFiles.html,config.appFiles.js)
  //  .pipe(plugins.connect.reload());
});


gulp.task('version', function () {
  plugins.git.exec({args : 'rev-parse HEAD'}, function (err, stdout) {
    if (err) throw err;
    var fs = require('fs');
    var date = new Date();
    fs.writeFile("version.json", '{\n"commit":"'+stdout.replace("\n", "")+'",\n"date":"'+date.toDateString() + ' ' +date.toTimeString()+'"\n}', function(err) {
      if(err) {
        return console.log(err);
      }

      console.log("The version file was saved!");
    });
  });
});
