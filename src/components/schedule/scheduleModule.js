/**
 * Created by eaura on 2015-07-03.
 */

import '../../core/coreModule';
import UtsaSchedScheduleController from './controllers/utsaSchedScheduleController'
import UtsaSchedScheduleService from './services/utsaSchedScheduleService'
import utsaSchedSchedulerToolbar from './utsaSchedScheduleToolbar'
import UtsaSchedSideBarController from './controllers/utsaSchedSideBarController'
import UtsaSchedPersonalController from './controllers/utsaSchedPersonalController'
import 'angular-material-data-table'
import 'angular-material-data-table/dist/md-data-table.css!'
import "angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.css!"
import "angular-bootstrap-calendar"
import utsaSchedSwitchFilter from './filters/utsaSchedSwitchFilter'
import 'xml2js'
/**
 * @ngdoc overview
 * @name utsa.components.map
 *
 * @description
 * # Map module
 *
 * Handles rendering of devices on an interactive map
 *
 */
angular.module('utsaSched.components.schedule', ['utsaSched.core', 'md.data.table', 'mwl.calendar'])

  .config(function config($stateProvider, calendarConfig) {

    $stateProvider.state('schedule', {
      url: '/schedule',
      views: {
        "main": {
          controller: UtsaSchedScheduleController,
          templateUrl: 'src/components/schedule/utsaSched-schedule.tpl.html',
          controllerAs: 'schedCtrl'
        }, "sidebar": {
          controller: UtsaSchedSideBarController,
          templateUrl: 'src/components/schedule/templates/sidebar.tpl.html',
          controllerAs: 'sideBarCtrl'
        },
        data: {
          pageTitle: 'Schedule'
        }
      },
    }).state('personal', {
      url: '/schedule/{callsign:[0-9]{3}}',
      views: {
        "main": {
          controller: UtsaSchedPersonalController,
          templateUrl: 'src/components/schedule/templates/personal.tpl.html',
          controllerAs: 'personalCtrl'
        }, "sidebar": {
          controller: UtsaSchedSideBarController,
          templateUrl: 'src/components/schedule/templates/sidebar.tpl.html',
          controllerAs: 'sideBarCtrl'
        },
        data: {
          pageTitle: 'Schedule'
        }
      }
    });

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    calendarConfig.showTimesOnWeekView = true;
    calendarConfig.dateFormatter = 'moment'

  })
  .service('UtsaSchedScheduleService', UtsaSchedScheduleService)
  .directive('utsaSchedSchedulerToolbar', utsaSchedSchedulerToolbar)
  .filter('switchFilters',utsaSchedSwitchFilter);
;


