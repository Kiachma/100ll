import angular from 'angular';

// Import 3rd party modules
import _ from 'lodash/lodash';
import 'angular-material';
import 'restangular';
import "angular-dynamic-locale";
import "angular-translate";
import "angular-translate-loader-static-files";

// Import utsaSched Core Modules
//import './authenticator/authenticatorModule';
import './navigator/navigatorModule';
import './version/versionModule';

/**
 * @ngdoc overview
 * @name utsaSched.core
 *
 * @requires ngMaterial
 * @requires lodash
 * @requires restangular
 * @requires pascalprecht.translate
 * @requires utsaSched.core.authenticator
 * @requires utsaSched.core.navigator
 * @requires utsaSched.core.version
 *
 * @description
 * # utsaSched.core - The core module for utsaSched
 *
 * This module include the minimum modules necessary to run utsaSched.
 * That includes core components like the authenticator, navigator etc.
 *
 */
angular.module('utsaSched.core', [
  // Inject global 3rd party modules
  'ngMaterial',
  'restangular',

  // Inject utsaSched Core Modules
  'utsaSched.core.navigator',
  'utsaSched.core.version'
])

  .constant('utsaSchedRestUrl', 'http://www.talon.kiachma.webfactional.com')
  .config(function (RestangularProvider, utsaSchedRestUrl,$mdThemingProvider) {


    $mdThemingProvider.theme('default')
      .primaryPalette('green')

      .accentPalette('orange');
    // Sets the base address to the CS
    RestangularProvider.setBaseUrl(utsaSchedRestUrl);

    // Configures the translator


  })


  .run(function ($rootScope, $state, $log, $injector) {
    $rootScope.state = $state;
    //Angular UI Router debug
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (toState.views) {
        if (toState.views.sidebar || toState.views['sidebar@']) {
          $rootScope.sidebar = true;
        } else {
          $rootScope.sidebar = false;
        }
        if (toState.views.bottomFab || toState.views['bottomFab@']) {
          $rootScope.bottomFab = true;
        } else {
          $rootScope.bottomFab = false;
        }
      }
    });


    //Angular UI Router debug
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
    });
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('$stateChangeError - fired when an error occurs during transition.');
      $log.debug(arguments);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });
    // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
    //   // runs on individual scopes, so putting it in "run" doesn't work.
    //   $log.info('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
    // });
    $rootScope.$on('$viewContentLoaded', function (event) {
      $log.debug('$viewContentLoaded - fired after dom rendered', event);
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      $log.debug('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
      $log.debug(unfoundState, fromState, fromParams);
    });


  });

