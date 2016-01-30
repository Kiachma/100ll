
function utsaSchedSchedulerToolbar(UtsaSchedScheduleService,$interval) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/components/schedule/utsaSched-schedule-toolbar.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.UtsaSchedScheduleService=UtsaSchedScheduleService;
    var tick = function() {
      scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
  }
}

utsaSchedSchedulerToolbar.$inject = ['UtsaSchedScheduleService','$interval'];

export default utsaSchedSchedulerToolbar;
