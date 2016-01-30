

import '../coreModule';
import 'angular-mocks';
import 'jquery';
import  'jasmine-jquery';
import moment from 'moment/moment-timezone';
let helper = {
  module: angular.mock.module,
  inject: angular.mock.inject
};
moment.tz.setDefault("Europe/Oslo");
beforeEach(angular.mock.module('utsaSched.core',function ($provide, $translateProvider) {

  $provide.factory('customLoader', function ($q) {
    return function () {
      var deferred = $q.defer();
      deferred.resolve({});
      return deferred.promise;
    };
  });

  $translateProvider.useLoader('customLoader');

}));
beforeEach(()=> {
  jasmine.getJSONFixtures().fixturesPath = 'base/mocks';
});
export default helper;
