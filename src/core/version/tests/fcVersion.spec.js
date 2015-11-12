/**
 * Created by eaura on 2015-06-26.
 */

import angular from 'angular';
import  '../versionModule';
import 'angular-mocks';



describe('Directive: myDirective', function() {

  beforeEach(angular.mock.module('100ll.core.version'));
  beforeEach(angular.mock.module('templates-app'));
  var versionDev = {
    "tag":"0.0.1",
    "commit":"261fb589916afb427aa143705bbc4d6365c07800",
    "date":"Fri Jul 03 2015 11:39:40 GMT+0200 (CEST)"
  };
  var versionProd = {
    "tag":"0.0.1",
  };
  var element;
  var scope;

  var httpBackend;
  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.whenGET('version.json').respond('');

  }));
  describe('Development', function() {
    beforeEach(inject(function($rootScope, $compile) {

      scope = $rootScope.$new();
      element = angular.element('<100ll-version></100ll-version>');
      element = $compile(element)(scope);
      scope.version = versionDev;
      scope.$digest();

    }));

    it('should show the current version', function() {
      var elem = element.find('span');
      expect(elem.text()).toContain(versionDev.tag);
      expect(elem.text()).toContain(versionDev.commit);
      expect(elem.text()).toContain(versionDev.date);
    });

    describe('Production', function() {
      beforeEach(inject(function($rootScope, $compile) {

        scope = $rootScope.$new();
        element = angular.element('<100ll-version></100ll-version>');
        element = $compile(element)(scope);
        scope.version = versionProd;
        scope.$digest();

      }));

      it('should show the current version', function() {
        var elem = element.find('span');
        expect(elem.text()).toContain(versionProd.tag);
        expect(elem.text()).not.toContain(versionDev.commit);
        expect(elem.text()).not.toContain(versionDev.date);
      });
    });

  });
});
