import moment from 'moment';
function utsaSchedVersion(utsaSchedVersionService,$log) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/version/utsaSched-version.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.enabled = true;
    utsaSchedVersionService.getVersion().then(function(version){
      scope.version = {};
      scope.version.commit=version.commit;
      scope.version.tag=version.tag;
      scope.version.date=moment(version.date).format("DD.MM.YYYY, HH:mm:ss");
    });

  }
}

utsaSchedVersion.$inject = ['utsaSchedVersionService','$log'];

export default utsaSchedVersion;
