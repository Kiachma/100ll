class UtsaSchedFlightController {
  constructor($scope, $mdDialog, flight, backseat) {

    $scope.flight = flight;
    $scope.backseat = backseat;
    $scope.cancel = function () {
      $mdDialog.cancel();
    };


  }
}
UtsaSchedFlightController.$inject = [
  '$scope',
  '$mdDialog',
  'flight',
'backseat'];

export default UtsaSchedFlightController;
