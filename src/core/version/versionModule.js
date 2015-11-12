import angular from 'angular';
import 100llVersionService from './100llVersionService';
import 100llVersion from './100llVersion';

/**
 * @ngdoc overview
 * @name 100ll.core.version
 *
 * @description
 * # Version module
 *
 * Includes Version directive and Service
 *
 */
angular.module('100ll.core.version', [])
/**
 * @ngdoc service
 * @name 100ll.core.version.100llVersionService
 *
 * @description
 * Service. Fetches version information.
 */
  .service('100llVersionService', 100llVersionService)

/**
 * @ngdoc directive
 * @name 100ll.core.version.100llVersion
 *
 * @restrict E
 * @description
 * Directive. Prints the current UI version
 */
  .directive('100llVersion', 100llVersion);
