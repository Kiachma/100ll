import moment from 'moment'
import UtsaSchedFlightController from './utsaSchedFlightController'
class UtsaSchedScheduleController {
  constructor($rootScope,
              $scope,
              $state,
              $stateParams,
              $log,
              UtsaSchedScheduleService,
              $mdDialog) {
    this.calendarView = 'day';
    this.calendarDate=moment()
    UtsaSchedScheduleService.fetchSchedule($stateParams.callsign).then((data)=>{
      this.events=data;
    })
    };
  prev(){
    this.calendarDate.subtract(1, 'days')
  }
  next(){
    this.calendarDate.add(1, 'days')
  }
  printDate(date){
    return moment(date).format('DD.MM.YYYY')
  }






}


UtsaSchedScheduleController.$inject = [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  '$log',
  'UtsaSchedScheduleService',
  '$mdDialog'
];

export default UtsaSchedScheduleController;
