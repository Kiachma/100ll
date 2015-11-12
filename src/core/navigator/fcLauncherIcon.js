function 100llLauncherIcon() {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/navigator/100ll-launcher-icon.tpl.html',
    scope:{
      title:'@',
      icon:'@'
    }
  };
  return directive;
}

//100llLauncherIcon.$inject = ['$state'];

export default 100llLauncherIcon;
