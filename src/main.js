// Import AngularJS
import angular from 'angular';

// Import UtsaSched Core
import './core/coreModule';

// Import UtsaSched Components
import './components/schedule/scheduleModule';

/**
 * Try to import templates module (used in production)
 * If not defined create dummy module (Development)
 **/
try {
  angular.module('templates-app');
} catch (err) {
  angular.module("templates-app", []);
}
/**
 * @ngdoc overview
 * @name UtsaSched
 *
 * @description
 * # UtsaSched - UtsaSched
 * @requires UtsaSched.core
 * @requires templates-app
 * @requires UtsaSched.components.eventlog
 * @requires UtsaSched.components.system
 * @requires UtsaSched.components.usermanager
 * @requires UtsaSched.components.map
 * This is the main module for the UtsaSched.
 * The core platform is located in the {@link UtsaSched.core} module
 * Other modules are located in the UtsaSched.components.* packages.
 *
 */
angular.module('utsaSched', [

  // Inject UtsaSched Core
  'utsaSched.core',
  'templates-app',
  // Inject UtsaSched Components
  'utsaSched.components.schedule'
  // Inject Apps Module
]);
