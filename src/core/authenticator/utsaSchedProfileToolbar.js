function utsaSchedProfileToolbar(utsaSchedAuthService) {
  let directive = {
    templateUrl: 'src/core/authenticator/utsaSched-profile-toolbar.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    scope.auth = utsaSchedAuthService.getToken();

    // Listen for auth
    scope.$on('utsaSched.auth', function(events, args){
      scope.auth = args;
    });

    scope.logOut = function(){
      utsaSchedAuthService.invalidateToken();
    };
  }
}

utsaSchedProfileToolbar.$inject = ['utsaSchedAuthService'];

export default utsaSchedProfileToolbar;
