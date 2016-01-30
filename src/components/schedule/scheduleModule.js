/**
 * Created by eaura on 2015-07-03.
 */

import '../../core/coreModule';
import UtsaSchedScheduleController from './controllers/utsaSchedScheduleController'
import UtsaSchedScheduleService from './services/utsaSchedScheduleService'
import utsaSchedSchedulerToolbar from './utsaSchedScheduleToolbar'
import 'angular-material-data-table'
import 'angular-material-data-table/dist/md-data-table.css!'



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
angular.module('utsaSched.components.schedule', ['utsaSched.core','md.data.table'])

.config(function config($stateProvider) {

  $stateProvider.state('schedule', {
      url: '/schedule',
      views: {
        "main": {
          controller: UtsaSchedScheduleController,
          templateUrl: 'src/components/schedule/utsaSched-schedule.tpl.html',
          controllerAs:'schedCtrl'
        },
      data: {
        pageTitle: 'Schedule'
      }
    }});



})
  .service('UtsaSchedScheduleService', UtsaSchedScheduleService)
.directive('utsaSchedSchedulerToolbar',utsaSchedSchedulerToolbar)
;


