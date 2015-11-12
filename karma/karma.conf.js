var sourcePreprocessors = ['babel','coverage'];
function isDebug(argument) {
  return argument === '--debug';
}
if (process.argv.some(isDebug)) {
  sourcePreprocessors = ['babel'];
}

module.exports = function (karma) {
  karma.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    jspm: {

      // Edit this to your needs
      loadFiles: ['src/**/*spec.js','src/**/*.tpl.html'],
      serveFiles: ['src/**/*.js','mocks/**/*.json']

    },
    //files: [
    //    {pattern: 'mocks/*.json', watched: true, served: true, included: false}
    //],

    frameworks: [
      'jspm',
      'jasmine'
    ],

    preprocessors: {
      'src/**/!(*spec,*scenario).js': sourcePreprocessors,
      'src/**/*.tpl.html': ['ng-html2js']

    },
    ngHtml2JsPreprocessor: {


      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'templates-app',
      systemJS: true
    },

    babelPreprocessor: {
      options: {
        modules: 'system'
      }
    },


    /**
     * How to report, by default.
     */
    reporters : ['coverage','progress', 'junit'],
    junitReporter: {
      outputFile: 'test-results/unit.xml', // results will be saved as $outputDir/$browserName.xml
      suite: ''
    },
    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'test-results/coverage/'
    },

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karma.LOG_INFO, //config.LOG_INFO,
    /**
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Firefox'
    ],

  });
};
