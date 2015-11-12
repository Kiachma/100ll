import angular from 'angular';

// Import 3rd party modules
import _ from 'lodash/lodash';
import 'angular-material';
import 'restangular';
import "angular-dynamic-locale";
import "angular-translate";
import "angular-translate-loader-static-files";

// Import 100ll Core Modules
import './authenticator/authenticatorModule';
import './navigator/navigatorModule';
import './version/versionModule';

/**
 * @ngdoc overview
 * @name 100ll.core
 *
 * @requires ngMaterial
 * @requires lodash
 * @requires restangular
 * @requires pascalprecht.translate
 * @requires 100ll.core.authenticator
 * @requires 100ll.core.navigator
 * @requires 100ll.core.version
 *
 * @description
 * # 100ll.core - The core module for 100ll
 *
 * This module include the minimum modules necessary to run 100ll.
 * That includes core components like the authenticator, navigator etc.
 *
 */
angular.module('100ll.core', [
  // Inject global 3rd party modules
  'ngMaterial',
  'restangular',
  'chart.js',
  'tmh.dynamicLocale',
  'pascalprecht.translate',

  // Inject 100ll Core Modules
  '100ll.core.authenticator',
  '100ll.core.navigator',
  '100ll.core.version'
])

  .constant('100llRestUrl', 'http://127.0.0.1:8080')
  .config(function (RestangularProvider, 100llRestUrl, $translateProvider, tmhDynamicLocaleProvider, $mdThemingProvider, ChartJsProvider) {

    // Setting up the theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('green');

    $mdThemingProvider.theme('100ll-dark', 'default')
      .primaryPalette('yellow')
      .dark()

    $mdThemingProvider.setDefaultTheme('default');

    // Sets the base address to the CS
    RestangularProvider.setBaseUrl(100llRestUrl);

    // Configures the translator
    $translateProvider.useStaticFilesLoader({
      prefix: 'locales/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en_US');
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

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

