import moment from 'moment'
import UtsaSchedFlightController from './utsaSchedFlightController'
class UtsaSchedScheduleController {
  constructor($rootScope,
              $scope,
              $state,
              $stateParams,
              $log,
              UtsaSchedScheduleService,
              $mdDialog,
              $mdMedia) {
    var self = this;
    this.UtsaSchedScheduleService = UtsaSchedScheduleService;
    this.$mdMedia = $mdMedia;
    this.$mdDialog = $mdDialog;
    this.selected = [];
    this.order = "EventStart"
    this.query = {
      filter: '',
      order: 'name',
      limit: 5,
      page: 1
    };
    if ($mdMedia('gt-lg')) {
      this.selected = ['Day', 'Briefing', 'Off block', 'Student', 'Callsign', 'Instructor', 'Resource', 'Status', 'Type', 'Lesson', 'Destination', 'Due back', 'Duration']
    } else if ($mdMedia('gt-md')) {
      this.selected = ['Day', 'Briefing', 'Off block', 'Student', 'Instructor', 'Resource', 'Status', 'Type', 'Lesson', 'Due back']
    } else if ($mdMedia('gt-sm')) {
      this.selected = ['Day', 'Briefing', 'Off block', 'Student', 'Instructor', 'Resource', 'Lesson']
    } else if ($mdMedia('gt-xs')) {
      this.selected = ['Day', 'Briefing', 'Student', 'Resource', 'Lesson']
    } else {
      this.selected = ['Day', 'Briefing', 'Student']    }

  }

  showDialog(selected) {
    this.$mdDialog.show({
      controller: UtsaSchedFlightController,
      templateUrl: 'src/components/schedule/templates/flight.tpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        flight: selected
      },
      resolve: {
        backseat: () => {
          return this.getBackSeat(selected);
        }
      }
    })
  };

  getBackSeat(flight) {
    var name = "";
    for (var i = 0; i < this.UtsaSchedScheduleService.data.flights.length; i++) {
      if (flight.Id == this.UtsaSchedScheduleService.data.flights[i].Id && this.UtsaSchedScheduleService.data.flights[i].Lesson == 'Backseat') {
        name = this.UtsaSchedScheduleService.data.flights[i].Student;
      }
    }
    return name
  }

  hasBackSeat(flight) {
    var backseat = false;
    for (var i = 0; i < this.UtsaSchedScheduleService.data.flights.length; i++) {
      if (flight.Id == this.UtsaSchedScheduleService.data.flights[i].Id && this.UtsaSchedScheduleService.data.flights[i].Lesson == 'Backseat') {
        backseat = true;
      }
    }
    return backseat

  }

  newDate(date, key) {
    if (key == 0) {
      return true
    }


    var previousDate = this.filtered[key - 1];
    return !moment(date.EventStart).isSame(moment(previousDate.EventStart), 'day');


  }

  duration(first, second) {
    return moment(second).diff(moment(first), 'hours', true).toFixed(1)

  }


  isActive(start, stop) {
    var now = moment();
    return moment(start).isBefore(now) && moment(stop).set('year', now.get('year')).isAfter(now);

  }

  isOddDay(date) {
    return moment(date).get('date') % 2 == 1;
  }

  isToday(date) {
    return moment(date).format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
  }

  completed(status) {
    return status.indexOf("Completed") > -1

  }

  cancelled(status) {
    return status.indexOf("Cancelled") > -1

  }

  show(item, selected) {
    return selected.indexOf(item) != -1;
  }

  toggle(item, selected) {
    if (selected.indexOf(item) != -1) {
      selected.pop(item)
    } else {
      selected.push(item)
    }

  }


}


UtsaSchedScheduleController.$inject = [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  '$log',
  'UtsaSchedScheduleService',
  '$mdDialog',
  '$mdMedia'
];

export default UtsaSchedScheduleController;
