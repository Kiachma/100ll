/**
 * Created by eaura on 2015-06-26.
 * Gulp file that handles production deployment
 */

var gulp = require('gulp'),
  es = require('event-stream'),
  del = require('del'),
  Q=require('q'),
  gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var config =  require('../config');
var pipes = require('../utils/pipes').pipes;
var cachebust = require('gulp-cache-bust');

/**
 * Creates angular module app-templates in templates.js, that loads minified versions, of all *tpl.html files found in src, into $templateCache
 * @returns {Stream} templates.js
 */
pipes.scriptPartials = function() {
  return gulp.src(config.appFiles.tpl)
    //Minify
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    //Create angular module files from minified html files
    .pipe(plugins.ngHtml2js({
      prefix:'src/',
      moduleName:'templates-app'
    }))
    // Concat all files into one
    .pipe(plugins.concat('templates.js'));
};

/**
 * Minifies angular module containing scripted partials
 * @returns {Stream} scripted partials
 */
pipes.minifyScriptedPartials = function() {
  return pipes.scriptPartials()
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write());
};
/**
 * Injects needed js files into index.html's head element
 * @returns {Stream} index.html
 */

pipes.jsFilesToInject = function(){
  return  es.merge(pipes.minifyScriptedPartials(),gulp.src(config.jspmBundleProd))
    //concat all files into one large file
    .pipe(plugins.concat('app.js'))
    //Uglify (mangle:false needed for angular to work)
    .pipe(plugins.uglify({mangle: false}))

};

/**
 * Injects needed css files into index.html's head element
 * @returns {Stream} index.html
 */

pipes.cssFilesToInject = function(){
  return gulp.src(config.generated_css);

};



/**
 * Injects needed files into index.html's head element
 * @returns {Stream} index.html
 */

pipes.filesToInject = function(){
  return  es.merge(pipes.jsFilesToInject(),pipes.cssFilesToInject())
    .pipe(gulp.dest(config.prodDir));
};

pipes.index = function() {

  //inject bundle
  return gulp.src(config.appFiles.index)
    .pipe(plugins.inject(pipes.filesToInject(),{
      ignorePath: config.prodDir+'/',
      relative:true}))
    //minify index.html
    .pipe(plugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true

    }))
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest(config.prodDir));
};
gulp.task('locale',['clean-prod'],function() {
  gulp.src(config.appFiles.locale)
    .pipe(gulp.dest(config.prodDir + '/locales'));

});

/**
 * Requires 'bundleJSPM' to have been run
 * Runs  pipes.index()
 * @returns {Stream} index.html
 */
gulp.task('buildProdApp',['bundleJSPM'],function() {
  setTimeout(function () {
    return pipes.index();

  }, 30000);

});

/**
 * Requires 'clean-prod' and 'jspm-bundle' to have been run
 * Waits for 10000 milliseconds, to ensure that 'jspm-bundle' have completed
 * @returns {Promise}
 */
gulp.task('bundleJSPM',['clean-prod','jspm-bundle'],function() {

});

/**
 * Starts 'jspm-bundle' 'buildProdApp' amd testing
 */
gulp.task('prod',['jspm-bundle','buildProdApp','version','sassProd','locale','ngdocs'],function() {
});
