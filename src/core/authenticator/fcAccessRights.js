function 100llAccessRights($animate, 100llAuthService) {
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

    $animate[hasAnyAccessRights(attributes.100llAccessRights) ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
      tempClasses: NG_HIDE_IN_PROGRESS_CLASS
    });

    scope.$on('100ll.auth', function (events, args) {
      $animate[hasAnyAccessRights(attributes.100llAccessRights) ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
      });
    });
  }

  function hasAnyAccessRights(100llAccessRights) {
    //Remove whitespace and split up on semicolon
    var accessRights = 100llAccessRights.replace(/ /g, '').toUpperCase().split(';');
    for (let accessRight of accessRights) {
      let tuple = accessRight.split(':');
      let resource = tuple[0];
      for (var right of tuple[1].split('|')) {
        if (100llAuthService.hasAccessRight(resource, right)) {
          return true;
        }
      }
    }
    return false;
  }
}

100llAccessRights.$inject = ['$animate', '100llAuthService'];

export default 100llAccessRights;
