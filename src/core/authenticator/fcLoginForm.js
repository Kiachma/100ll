function 100llLoginForm(100llAuthService) {
  let directive = {
    restrict: 'E',
    templateUrl: 'src/core/authenticator/100ll-login-form.tpl.html',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    // The credentials model
    scope.credentials = {user: "", password: "", realm: "demo"};

    // Calls the auth service with the provided credentials
    scope.login = function () {
      100llAuthService.login(scope.credentials)
        .catch(function (res) {
          // If the login fails, display the error message
          scope.error = res.error.message;
        });
    };
  }
}

100llLoginForm.$inject = ['100llAuthService'];

export default 100llLoginForm;
