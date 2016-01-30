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
    var self = this;
    this.UtsaSchedScheduleService = UtsaSchedScheduleService;

    this.$mdDialog = $mdDialog;
    this.selected = [];
    this.order = "EventStart"

    this.query = {
      filter: '',
      order: 'name',
      limit: 5,
      page: 1
    };

    function success(desserts) {
      this.desserts = desserts;
    }

    // in the future we may see a few built in alternate headers but in the mean time
    // you can implement your own search header and do something like
    this.search = function (predicate) {
      this.filter = predicate;
      this.deferred = $nutrition.desserts.get(this.query, success).$promise;
    };


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
        backseat:()  => {
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

  isActive(start, stop) {
    var now = moment();
    return moment(start).isBefore(now) && moment(stop).set('year', now.get('year')).isAfter(now);

  }

  isOddDay(date) {
    return moment(date).get('date') % 2 == 1;
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
