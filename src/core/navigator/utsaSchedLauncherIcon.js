function utsaSchedLauncherIcon() {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/navigator/utsaSched-launcher-icon.tpl.html',
    scope:{
      title:'@',
      icon:'@'
    }
  };
  return directive;
}

//utsaSchedLauncherIcon.$inject = ['$state'];

export default utsaSchedLauncherIcon;
