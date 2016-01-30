/**
 * Created by eaura on 2015-06-26.
 */

import angular from 'angular';
import  '../versionModule';
import 'angular-mocks';



describe('Service: versionService', function() {

  beforeEach(module('utsaSched.core.version'));
  var versionService;
  var httpBackend;
  beforeEach(inject(function($httpBackend, _utsaSchedVersionService_) {
    httpBackend = $httpBackend;
    versionService = _utsaSchedVersionService_;
  }));

  describe('HTTP calls', function() {

    var version;
    var errorStatus = '';
    var handler;
    beforeEach(function() {
      version = '';
      errorStatus = '';
      handler = {
        success: function(data) {
          version = data;
        },
        error: function(data) {
          errorStatus = data;
        }
      };
      spyOn(handler, 'success').and.callThrough();
      spyOn(handler, 'error').and.callThrough();
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should try to fetch version file', function() {
      httpBackend.expectGET('version.json').respond('');
      versionService.getVersion();
      httpBackend.flush();
    });

    it('should return the version on success', function() {
      var response = 'asd';

      httpBackend.whenGET('version.json').respond(response);
      versionService.getVersion().then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.success).toHaveBeenCalled();
      expect(version).toEqual(response);
      expect(handler.error).not.toHaveBeenCalled();
      expect(errorStatus).toEqual('');
    });

    it('should return the status on error', function() {
      httpBackend.whenGET('version.json').respond(404, {status: 404});
      versionService.getVersion().then(handler.success, handler.error);
      httpBackend.flush();

      expect(handler.error).toHaveBeenCalled();
      expect(errorStatus).toEqual(404);
      expect(handler.success).not.toHaveBeenCalled();
      expect(version).toEqual('');
    });

  });

});
