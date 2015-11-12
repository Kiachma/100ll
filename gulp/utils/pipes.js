/**
 * Created by eaura on 2015-06-26.
 * Common pipes used by other gulp files
 */
var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
module.exports = {
  pipes:{
    minifyFileName : function () {
      return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
      });
    }

  }
};
