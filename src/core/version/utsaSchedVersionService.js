class utsaSchedVersionService {
  constructor($http,$q) {
    this.$http = $http;
    this.$q = $q;

  }

  /**
   * @ngdoc function
   * @name utsaSched.core.version.utsaSchedVersionService#getVersion
   * @methodOf utsaSched.core.version.utsaSchedVersionService
   *
   *
   * @description Fetches the version.json file
   *
   */
  getVersion() {
    return this.$http.get('version.json').then(response => {
        return response.data;
      },
      error => {
        return this.$q.reject(error.status);
      }
    );
  }
}
utsaSchedVersionService.$inject = ['$http', '$q'];

export default utsaSchedVersionService;
