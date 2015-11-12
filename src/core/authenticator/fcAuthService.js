class 100llAuthService {
  constructor($http, $cookies, 100llRestUrl, $rootScope, $state, $q) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.100llRestUrl = 100llRestUrl;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$q = $q;
    this.data = {};
  }

  /**
   * @ngdoc function
   * @name 100ll.core.authenticator.100llAuthService#login
   * @methodOf 100ll.core.authenticator.100llAuthService
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
    return this.$http.post(this.100llRestUrl + '/auth/login', credentials).then(
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
        self.$rootScope.$broadcast('100ll.auth', self.data);
        self.$state.go('system');
      },
      //Login fail
      function (response) {
        return self.$q.reject(response.data);
      });
  }

  /**
   * @ngdoc function
   * @name 100ll.core.authenticator.100llAuthService#invalidateToken
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   *
   * @description Invalidates the current token on the server.
   *
   */
  invalidateToken() {
    var self = this;
    this.$http.delete(this.100llRestUrl + '/auth/token').then(
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
   * @name 100ll.core.authenticator.100llAuthService#logOut
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   *
   * @description Logs out the currently logged in user
   *
   */
  logout() {
    this.$cookies.remove('token');
    this.data = {};
    this.$rootScope.$broadcast('100ll.auth', self.data);
    this.$state.go('login');
  }

  /**
   * @ngdoc function
   * @name 100ll.core.authenticator.100llAuthService#fetchUser
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   * @description Returns the current user
   *
   */
  fetchUser() {
    var self = this;
    this.$http.get(this.100llRestUrl + '/auth/user').then(
      //Login success
      function (response) {
        // We save the auth data in the service
        self.data.user = response.data;
        self.$rootScope.$broadcast('100ll.auth', self.data.user);
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
   * @name 100ll.core.authenticator.100llAuthService#fetchToken
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   * @description Returns the current auth information
   *
   */
  fetchToken() {
    var self = this;
    this.$http.get(this.100llRestUrl + '/auth/token').then(
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
        self.$rootScope.$broadcast('100ll.auth', self.data);
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
   * @name 100ll.core.authenticator.100llAuthService#hasAccessRights
   * @methodOf 100ll.core.authenticator.100llAuthService
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
   * @name 100ll.core.authenticator.100llAuthService#getUser
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   * @description Returns the authenticated user
   *
   */
  getUser() {
    return this.data.user ? this.data.user : this.fetchUser();
  }

  /**
   * @ngdoc function
   * @name 100ll.core.authenticator.100llAuthService#fetchToken
   * @methodOf 100ll.core.authenticator.100llAuthService
   *
   * @description Returns the authenticated user data
   *
   */
  getToken() {
    return this.data.token ? this.data.token : this.fetchToken();
  }

}

100llAuthService
  .
  $inject = ['$http', '$cookies', '100llRestUrl', '$rootScope', '$state', '$q'];

export
default
100llAuthService;
