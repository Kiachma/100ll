class utsaSchedAuthService {
  constructor($http, $cookies, utsaSchedRestUrl, $rootScope, $state, $q) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.utsaSchedRestUrl = utsaSchedRestUrl;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$q = $q;
    this.data = {};
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#login
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   *
   * @description Attempts to log in the user with the provided credentials
   *
   * @param {object} credentials object
   *
   */
  login(credentials) {
    // The promise changes the value of this, so we need to store it
    var self = this;
    return this.$http.post(this.utsaSchedRestUrl + '/login', credentials).then(
      //Login success
      function (response) {
        // We save the token as a cookie, so we don't need to ask for credentials on refresh etc.
        self.$cookies.put('token', response.data.token, {'expires': response.data.expires});
        // We get the user data
        self.data.user = response.data.user;
        self.data.accessrights = {};
        for (let i = 0; i < response.data.accessrights.length; i++) {
          self.data.accessrights[response.data.accessrights[i].resource] = {};
          for (let j = 0; j < response.data.accessrights[i].right.length; j++) {
            self.data.accessrights[response.data.accessrights[i].resource][response.data.accessrights[i].right[j]] = true;
          }
        }
        self.$rootScope.$broadcast('utsaSched.auth', self.data);
        self.$state.go('system');
      },
      //Login fail
      function (response) {
        return self.$q.reject(response.data);
      });
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#invalidateToken
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   *
   * @description Invalidates the current token on the server.
   *
   */
  invalidateToken() {
    var self = this;
    this.$http.delete(this.utsaSchedRestUrl + '/token').then(
      //Logout success
      function (response) {
        // We save the token as a cookie, so we don't need to ask for credentials on refresh etc.
        self.logout();
      },
      //Logout fail
      function (response) {
        self.logout();
      });
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#logOut
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   *
   * @description Logs out the currently logged in user
   *
   */
  logout() {
    this.$cookies.remove('token');
    this.data = {};
    this.$rootScope.$broadcast('utsaSched.auth', self.data);
    this.$state.go('login');
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#fetchUser
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   * @description Returns the current user
   *
   */
  fetchUser() {
    var self = this;
    this.$http.get(this.utsaSchedRestUrl + '/user').then(
      //Login success
      function (response) {
        // We save the auth data in the service
        self.data.user = response.data;
        self.$rootScope.$broadcast('utsaSched.auth', self.data.user);
      },
      //Login fail
      function (response) {
        if (response.status === 401) { // Unauthorized
          console.log("Should login!");
        }
      });
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#fetchToken
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   * @description Returns the current auth information
   *
   */
  fetchToken() {
    var self = this;
    this.$http.get(this.utsaSchedRestUrl + '/token').then(
      //Login success
      function (response) {
        // We save the auth data in the service
        self.data.user = response.data.user;
        self.data.accessrights = {};
        for (let i = 0; i < response.data.accessrights.length; i++) {
          self.data.accessrights[response.data.accessrights[i].resource] = {};
          for (let j = 0; j < response.data.accessrights[i].right.length; j++) {
            self.data.accessrights[response.data.accessrights[i].resource][response.data.accessrights[i].right[j]] = true;
          }
        }
        self.$rootScope.$broadcast('utsaSched.auth', self.data);
      }
      ,
      //Login fail
      function (response) {
        if (response.status === 401) { // Unauthorized
          console.log("Should login!");
        }
      }
    )
    ;
  }


  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#hasAccessRights
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   *
   * @param {resource} resource The resource to check for
   * @param {resource} accessRight The access rights to check for
   * @description Returns true if the current user has the provided access right
   *
   */
  hasAccessRight(resource, right) {
    if (this.data.accessrights && this.data.accessrights[resource]) {
      return this.data.accessrights[resource][right];
    }
    return false;
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#getUser
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   * @description Returns the authenticated user
   *
   */
  getUser() {
    return this.data.user ? this.data.user : this.fetchUser();
  }

  /**
   * @ngdoc function
   * @name utsaSched.core.authenticator.utsaSchedAuthService#fetchToken
   * @methodOf utsaSched.core.authenticator.utsaSchedAuthService
   *
   * @description Returns the authenticated user data
   *
   */
  getToken() {
    return this.data.token ? this.data.token : this.fetchToken();
  }

}

utsaSchedAuthService
  .
  $inject = ['$http', '$cookies', 'utsaSchedRestUrl', '$rootScope', '$state', '$q'];

export
default
utsaSchedAuthService;
