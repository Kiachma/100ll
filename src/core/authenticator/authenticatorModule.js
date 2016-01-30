import angular from 'angular';

import 'angular-cookies';

import utsaSchedAuthService from './utsaSchedAuthService';
import utsaSchedAuthInterceptor from './utsaSchedAuthInterceptor';
import utsaSchedProfileToolbar from './utsaSchedProfileToolbar';
import utsaSchedLoginForm from './utsaSchedLoginForm';
import utsaSchedAccessRights from './utsaSchedAccessRights';

/**
 * @ngdoc overview
 * @name utsaSched.core.authenticator
 *
 * @description
 * # Authenticator Module
 *
 * Includes Auth utilities
 *
 */
angular.module('utsaSched.core.authenticator', [
  'ngCookies' // Used to store the token
])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('utsaSchedAuthInterceptor');
  })
/**
 * @ngdoc service
 * @name utsaSched.core.authenticator.utsaSchedAuthService
 *
 * @description
 * Service. Manages user authentication.
 */
  .service('utsaSchedAuthService', utsaSchedAuthService)
/**
 * @ngdoc directive
 * @name utsaSched.core.authenticator.utsaSchedProfileToolbar
 *
 * @restrict E
 * @description
 * Directive. A toolbar for quick access to actions and info for the currently logged in user
 */
  .directive('utsaSchedProfileToolbar', utsaSchedProfileToolbar)
/**
 * @ngdoc directive
 * @name utsaSched.core.authenticator.utsaSchedAccessRights
 *
 * @restrict A
 * @description
 * Directive. Directive to hide features that the user does not have the access rights to use. If the user has any of the rights the element will be shown.
 *
 * @param {string} utsaSchedAccessRights Resource and access rights separated by 'comma', more than one right for a resource can be separated by |
 *
 * @example
 * var utsaSchedAccessRights = "system:all|view, user:all|view|list"
 *
 */
  .directive('utsaSchedAccessRights', utsaSchedAccessRights)
/**
 * @ngdoc directive
 * @name utsaSched.core.authenticator.utsaSchedLoginForm
 *
 * @restrict E
 * @description
 * Directive. Login form.
 *
 */
  .directive('utsaSchedLoginForm', utsaSchedLoginForm)

/**
 * @ngdoc service
 * @name utsaSched.core.authenticator.utsaSchedAuthInterceptor
 *
 * @description
 * Interceptor. Intercepts the $http service calls and injects the auth token
 *
 */
  .factory('utsaSchedAuthInterceptor', utsaSchedAuthInterceptor);
