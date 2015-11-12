function 100llNavbar() {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/navigator/100ll-navbar.tpl.html',
    link: link,
    controller: controller,
    controllerAs:'navCtrl'
  };
  return directive;

  function link(scope, element, attrs) {
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
100llNavbar.$inject = [
  '$mdUtil' ,
  '$mdSidenav'
  ];
export default 100llNavbar;
