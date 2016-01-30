function utsaSchedLoginForm(utsaSchedAuthService) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/authenticator/utsaSched-login-form.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    // The credentials model
    scope.credentials = {user: "", password: "", realm: "demo"};

    // Calls the auth service with the provided credentials
    scope.login = function () {
      utsaSchedAuthService.login(scope.credentials)
        .catch(function (res) {
          // If the login fails, display the error message
          scope.error = res.error.message;
        });
    };
  }
}

utsaSchedLoginForm.$inject = ['utsaSchedAuthService'];

export default utsaSchedLoginForm;
