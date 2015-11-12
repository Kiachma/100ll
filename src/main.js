// Import AngularJS
import angular from 'angular';

// Import 100ll Core
import './core/coreModule';

// Import 100ll Components

// Import Apps
import './apps/appsModule';

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
 * @name 100ll
 *
 * @description
 * # 100ll - 100ll
 * @requires 100ll.core
 * @requires templates-app
 * @requires 100ll.components.eventlog
 * @requires 100ll.components.system
 * @requires 100ll.components.usermanager
 * @requires 100ll.components.map
 * This is the main module for the 100ll.
 * The core platform is located in the {@link 100ll.core} module
 * Other modules are located in the 100ll.components.* packages.
 *
 */
var 100llApp = angular.module('100ll', [

  // Inject 100ll Core
  '100ll.core',
  'templates-app',
  // Inject 100ll Components
  // Inject Apps Module
]);
