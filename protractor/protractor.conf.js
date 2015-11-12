require('babel/register');

var jasmineReporters = require('jasmine-reporters');
exports.config = {
  // The advantage of directly connecting to browser drivers is that your test scripts may start up and run faster.
  //directConnect: true,

  // https://github.com/angular/protractor/blob/master/docs/jasmine-upgrade.md
  framework: 'jasmine2',

  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8080',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
      'browserName': 'firefox'
  },
  allScriptsTimeout: 20000,
  getPageTimeout: 20000,
  //capabilities: {
  //  'browserName': 'phantomjs',
  //
  //  /*
  //   * Can be used to specify the phantomjs binary path.
  //   * This can generally be ommitted if you installed phantomjs globally.
  //   */
  //  //'phantomjs.binary.path': require('phantomjs').path,
  //
  //  /*
  //   * Command line args to pass to ghostdriver, phantomjs's browser driver.
  //   * See https://github.com/detro/ghostdriver#faq
  //   */
  //  'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  //},

  // Spec patterns are relative to the configuration file location passed
  // to proractor (in this example confs.js).
  // They may include glob patterns.
  specs: ['../src/**/*scenario.js'],
  rootElement: '.100ll-app',
  onPrepare: function () {
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: 'test-results',
      consolidateAll: false
    }));
    require('protractor-http-mock').config = {
      rootDirectory: __dirname, // default value: process.cwd()
      protractorConfig: 'protractor.conf' // default value: 'protractor.conf'
    };
    browser.get(exports.config.baseUrl + '/#/login');
      browser.driver.manage().window().setSize(1920, 1080);
      // At this point, global 'protractor' object will be set up, and jasmine
      // will be available. For example, you can add a Jasmine reporter with:
      //     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
      //         'outputdir/', true, true));


      element(by.id('user')).sendKeys('bamboo');
      element(by.id('password')).sendKeys('bamboo');
      element(by.id('realm')).clear();
      element(by.id('realm')).sendKeys('demo');
      element(by.id('login')).click();


    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // index.html.
    return browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return /system/.test(url);
      });
    }, 10000);

  },

  mocks: {
    dir: 'E2E',
    default: ['default']
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    isVerbose: true,
    showTiming: true,
    includeStackTrace: true,
    showColors: true ,// Use colors in the command line report.
    defaultTimeoutInterval: 60000,
  }
};
