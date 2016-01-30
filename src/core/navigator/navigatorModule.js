import angular from 'angular';

import 'angular-ui-router';
import 'angular-breadcrumb';


import utsaSchedNavbar from './utsaSchedNavbar';
import utsaSchedLauncherIcon from './utsaSchedLauncherIcon';

angular.module('utsaSched.core.navigator', [
  'ui.router', // used to navigate between states and urls
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          "main": {
            template: '<utsaSched-login-form flex></utsaSched-login-form>'
          }

        }
      })
     ;
    $urlRouterProvider.otherwise('/schedule');

  })
  // Redirect to default child state
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)
      }
    });
  }])
  .directive('utsaSchedNavbar', utsaSchedNavbar)

/**
 * @ngdoc directive
 * @name utsaSched.components.dashboard.utsaSchedLauncherIcon
 *
 * @restrict E
 * @description
 * Directive. A launcher icon, displaying an icon and an optional text.
 */
  .directive('utsaSchedLauncherIcon', utsaSchedLauncherIcon);
