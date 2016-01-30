class UtsaSchedScheduleService {
  constructor($http, utsaSchedRestUrl, $q,$interval) {

    this.utsaSchedRestUrl = utsaSchedRestUrl;
    this.$http = $http;
    this.$q = $q;

    this.data = {
      flights: {},
      condition: "",
      showCompleted: false,
      showCancelled: false,
      endu:{}
    };
    var self = this;
    var fetchAll =function() {
      return self.$q.all([
        self.$http.get(self.utsaSchedRestUrl + "/flight"),
      ]).then(function success(result) {

        self.data.flights = result[0].data;
      });
    };
    var fetchCondition =function() {
      return self.$q.all([
        self.$http.get(self.utsaSchedRestUrl + "/condition"),
      ]).then(function success(result) {

        self.data.condition = result[0].data;
      });
    };

    var fetchENDUMetar =function() {
      return self.$q.all([
        self.$http.get("http://avwx.rest/api/metar.php?station=ENDU&format=JSON"),
      ]).then(function success(result) {

        self.data.endu = result[0].data;
      });
    };
    var refresh=()=>{
      this.deferred = fetchAll();
      this.deferredCond = fetchCondition();
      this.deferredMetar = fetchENDUMetar();
    };
    this.deferred = fetchAll();
    this.deferredCond =fetchCondition();
    this.deferredMetar = fetchENDUMetar();

    $interval(refresh, 30000);

  }




}


UtsaSchedScheduleService.$inject = ['$http', 'utsaSchedRestUrl', '$q','$interval'];

export default UtsaSchedScheduleService;
