/**
 * Created by eaura on 2015-06-26.
 * Config file for gulp
 */

// Directory used in production
var prod = "bin";

// Directory used in development
var dev = "src";

/**
 * Common paths
 */
module.exports = {
  appFiles:{
    js: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.scenario.js', '!src/assets/**/*.js','!src/**/*.js!eval'],
    jsunit: ['src/**/*.spec.js'],
    e2e: ['src/**/*.scenario.js'],

    html: ['src/**/*html'],
    tpl: ['src/**/*.tpl.html'],
    index: ['index.html'],
    sass:['src/**/*.scss'],
    sassMain:['src/main.scss'],
    locale:['locales/**/*']
  },
  jspmBundleProd:['bin/app.js'],
  jspmFilesDev:['jspm_packages/system.js','config.js','loadMain.js'],
  generated_css:'main.css',
  docs:'docs',
  gulpfiles:['gulp/**/*.js'],
  prodDir:prod,
  devDir:dev
};
