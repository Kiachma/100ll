class 100llVersionService {
  constructor($http,$q) {
    this.$http = $http;
    this.$q = $q;

  }

  /**
   * @ngdoc function
   * @name 100ll.core.version.100llVersionService#getVersion
   * @methodOf 100ll.core.version.100llVersionService
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
100llVersionService.$inject = ['$http', '$q'];

export default 100llVersionService;
