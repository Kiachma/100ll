import moment from 'moment'

class UtsaSchedScheduleController {
  constructor(UtsaSchedScheduleService) {

    return function (items) {
      var filtered = [];

      angular.forEach(items, function (item) {
        if (item.Lesson!='Backseat' && !((item.Status.indexOf("Completed") > -1 && !UtsaSchedScheduleService.data.showCompleted ) || (item.Status.indexOf("Cancelled") > -1 && !UtsaSchedScheduleService.data.showCancelled) && item.Lesson != 'Backseat')) {
          filtered.push(item);
        }
      });

      return filtered;
    };
  }
}

UtsaSchedScheduleController.$inject = ['UtsaSchedScheduleService'];

export default UtsaSchedScheduleController;
