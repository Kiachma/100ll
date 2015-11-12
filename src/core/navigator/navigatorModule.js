import angular from 'angular';

import 'angular-ui-router';
import 'angular-breadcrumb';


import 100llNavbar from './100llNavbar';
import 100llLauncherIcon from './100llLauncherIcon';

angular.module('100ll.core.navigator', [
  'ui.router', // used to navigate between states and urls
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          "main": {
            template: '<100ll-login-form flex></100ll-login-form>'
          }

        }
      })
      .state('eventlog', {
        url: '/system/eventlog',
        views: {
          "main": {
            template: '<100ll-eventlog flex></100ll-eventlog>'
          }
        }
      });
    $urlRouterProvider.otherwise('/system');

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
  .directive('100llNavbar', 100llNavbar)

/**
 * @ngdoc directive
 * @name 100ll.components.dashboard.100llLauncherIcon
 *
 * @restrict E
 * @description
 * Directive. A launcher icon, displaying an icon and an optional text.
 */
  .directive('100llLauncherIcon', 100llLauncherIcon);
