
function utsaSchedSchedulerToolbar(UtsaSchedScheduleService,$interval,$location) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/components/schedule/utsaSched-schedule-toolbar.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.UtsaSchedScheduleService=UtsaSchedScheduleService;
    scope.$location=$location;
    var tick = function() {
      scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
  }
}

utsaSchedSchedulerToolbar.$inject = ['UtsaSchedScheduleService','$interval','$location'];

export default utsaSchedSchedulerToolbar;
