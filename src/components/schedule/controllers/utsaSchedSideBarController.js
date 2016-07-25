class UtsaSchedSideBarController {
  constructor(UtsaSchedScheduleService,
              $rootScope) {
    this.$rootScope = $rootScope;
    this.UtsaSchedScheduleService = UtsaSchedScheduleService
  }



}


UtsaSchedSideBarController.$inject = [
  'UtsaSchedScheduleService',
  '$rootScope'];

export default UtsaSchedSideBarController;
