function utsaSchedNavbar(UtsaSchedScheduleService) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/navigator/utsaSched-navbar.tpl.html',
    link: link,
    controller: controller,
    controllerAs:'navCtrl'
  };
  return directive;

  function link(scope, element, attrs) {
    scope.UtsaSchedScheduleService=UtsaSchedScheduleService;
  }
  function controller($mdUtil,$mdSidenav){
    this.toggleRight = buildToggler('left');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
          });
      },200);
      return debounceFn;
    }
  }
}
utsaSchedNavbar.$inject = [
  '$mdUtil' ,
  '$mdSidenav',
  'UtsaSchedScheduleService'
  ];
export default utsaSchedNavbar;
