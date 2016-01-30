import angular from 'angular';
import utsaSchedVersionService from './utsaSchedVersionService';
import utsaSchedVersion from './utsaSchedVersion';

/**
 * @ngdoc overview
 * @name utsaSched.core.version
 *
 * @description
 * # Version module
 *
 * Includes Version directive and Service
 *
 */
angular.module('utsaSched.core.version', [])
/**
 * @ngdoc service
 * @name utsaSched.core.version.utsaSchedVersionService
 *
 * @description
 * Service. Fetches version information.
 */
  .service('utsaSchedVersionService', utsaSchedVersionService)

/**
 * @ngdoc directive
 * @name utsaSched.core.version.utsaSchedVersion
 *
 * @restrict E
 * @description
 * Directive. Prints the current UI version
 */
  .directive('utsaSchedVersion', utsaSchedVersion);
