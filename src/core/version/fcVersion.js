import moment from 'moment';
function 100llVersion(100llVersionService,$log) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/version/100ll-version.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.enabled = true;
    100llVersionService.getVersion().then(function(version){
      scope.version = {};
      scope.version.commit=version.commit;
      scope.version.tag=version.tag;
      scope.version.date=moment(version.date).format("DD.MM.YYYY, HH:mm:ss");
    });

  }
}

100llVersion.$inject = ['100llVersionService','$log'];

export default 100llVersion;
