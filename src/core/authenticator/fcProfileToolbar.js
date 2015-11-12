function 100llProfileToolbar(100llAuthService) {
  let directive = {
    templateUrl: 'src/core/authenticator/100ll-profile-toolbar.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.auth = 100llAuthService.getToken();

    // Listen for auth
    scope.$on('100ll.auth', function(events, args){
      scope.auth = args;
    });

    scope.logOut = function(){
      100llAuthService.invalidateToken();
    };
  }
}

100llProfileToolbar.$inject = ['100llAuthService'];

export default 100llProfileToolbar;
