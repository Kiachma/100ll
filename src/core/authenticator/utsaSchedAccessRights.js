function utsaSchedAccessRights($animate, utsaSchedAuthService) {
  let directive = {
    multiElement: true,
    restrict: 'A',
    priority: -1, // priority above ngHide/ngShow @ 0
    link: link
  };
  return directive;

  function link(scope, element, attributes) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

    $animate[hasAnyAccessRights(attributes.utsaSchedAccessRights) ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
      tempClasses: NG_HIDE_IN_PROGRESS_CLASS
    });

    scope.$on('utsaSched.auth', function (events, args) {
      $animate[hasAnyAccessRights(attributes.utsaSchedAccessRights) ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
      });
    });
  }

  function hasAnyAccessRights(utsaSchedAccessRights) {
    //Remove whitespace and split up on semicolon
    var accessRights = utsaSchedAccessRights.replace(/ /g, '').toUpperCase().split(';');
    for (let accessRight of accessRights) {
      let tuple = accessRight.split(':');
      let resource = tuple[0];
      for (var right of tuple[1].split('|')) {
        if (utsaSchedAuthService.hasAccessRight(resource, right)) {
          return true;
        }
      }
    }
    return false;
  }
}

utsaSchedAccessRights.$inject = ['$animate', 'utsaSchedAuthService'];

export default utsaSchedAccessRights;
