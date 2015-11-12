function 100llAuthInterceptor($injector, $cookies, 100llRestUrl, $q) {
  var 100llAuthService;
  return {
    request: function (config) {
      100llAuthService = $injector.get('100llAuthService');
      config.params = config.params || {};

      // REST calls should have auth token
      if ($cookies.get('token') && config.url.startsWith(100llRestUrl))
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
        100llAuthService.logout();
      }
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        100llAuthService.logout();
      }
      return $q.reject(rejection);
    }
  };
}

100llAuthInterceptor.$inject = ['$injector', '$cookies', '100llRestUrl', '$q'];

export default 100llAuthInterceptor;
