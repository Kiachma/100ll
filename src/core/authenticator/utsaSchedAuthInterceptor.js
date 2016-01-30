function utsaSchedAuthInterceptor($injector, $cookies, utsaSchedRestUrl, $q) {
  var utsaSchedAuthService;
  return {
    request: function (config) {
      utsaSchedAuthService = $injector.get('utsaSchedAuthService');
      config.params = config.params || {};

      // REST calls should have auth token
      if ($cookies.get('token') && config.url.startsWith(utsaSchedRestUrl))
        if (config.url.endsWith("/events/")) {
          //Event Stream should have token in the URL
          config.params.UserToken = $cookies.get('token');

        } else if (config.headers){
          //Other CS requests should have token in header
          config.headers.Authorization = 'UserToken ' + $cookies.get('token');
        }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        utsaSchedAuthService.logout();
      }
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        utsaSchedAuthService.logout();
      }
      return $q.reject(rejection);
    }
  };
}

utsaSchedAuthInterceptor.$inject = ['$injector', '$cookies', 'utsaSchedRestUrl', '$q'];

export default utsaSchedAuthInterceptor;
