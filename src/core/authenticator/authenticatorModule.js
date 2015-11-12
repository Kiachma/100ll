import angular from 'angular';

import 'angular-cookies';

import 100llAuthService from './100llAuthService';
import 100llAuthInterceptor from './100llAuthInterceptor';
import 100llProfileToolbar from './100llProfileToolbar';
import 100llLoginForm from './100llLoginForm';
import 100llAccessRights from './100llAccessRights';

/**
 * @ngdoc overview
 * @name 100ll.core.authenticator
 *
 * @description
 * # Authenticator Module
 *
 * Includes Auth utilities
 *
 */
angular.module('100ll.core.authenticator', [
  'ngCookies' // Used to store the token
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('100llAuthInterceptor');
  })
/**
 * @ngdoc service
 * @name 100ll.core.authenticator.100llAuthService
 *
 * @description
 * Service. Manages user authentication.
 */
  .service('100llAuthService', 100llAuthService)
/**
 * @ngdoc directive
 * @name 100ll.core.authenticator.100llProfileToolbar
 *
 * @restrict E
 * @description
 * Directive. A toolbar for quick access to actions and info for the currently logged in user
 */
  .directive('100llProfileToolbar', 100llProfileToolbar)
/**
 * @ngdoc directive
 * @name 100ll.core.authenticator.100llAccessRights
 *
 * @restrict A
 * @description
 * Directive. Directive to hide features that the user does not have the access rights to use. If the user has any of the rights the element will be shown.
 *
 * @param {string} 100llAccessRights Resource and access rights separated by 'comma', more than one right for a resource can be separated by |
 *
 * @example
 * var 100llAccessRights = "system:all|view, user:all|view|list"
 *
 */
  .directive('100llAccessRights', 100llAccessRights)
/**
 * @ngdoc directive
 * @name 100ll.core.authenticator.100llLoginForm
 *
 * @restrict E
 * @description
 * Directive. Login form.
 *
 */
  .directive('100llLoginForm', 100llLoginForm)

/**
 * @ngdoc service
 * @name 100ll.core.authenticator.100llAuthInterceptor
 *
 * @description
 * Interceptor. Intercepts the $http service calls and injects the auth token
 *
 */
  .factory('100llAuthInterceptor', 100llAuthInterceptor);
