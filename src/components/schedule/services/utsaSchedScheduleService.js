import moment from 'moment'

class UtsaSchedScheduleService {
  constructor($http, utsaSchedRestUrl, $q, $interval) {
    Date.prototype.addDays = function (days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    }
    this.utsaSchedRestUrl = utsaSchedRestUrl;
    this.$http = $http;
    this.$q = $q;

    this.data = {
      flights: {},
      condition: "",
      showCompleted: false,
      showCancelled: false,
      endu: {},
      endDate: new Date().addDays(5),
      startDate: new Date(),
      todayPlusFive:true
    };
    this.fetchSchedule = function (callSign) {
      return self.$q.all([
        self.$http.get(self.utsaSchedRestUrl + "/schedule/" + callSign),
      ]).then(function success(result) {

        return parseEvents(result[0].data);
      });
    };
    var self = this;
   this.fetchAll = function () {
     var dates;
     if(this.data.todayPlusFive){
       dates ="/"+ moment().format("YYYY-MM-DD")+"/"+moment().add(5, 'days').format("YYYY-MM-DD")
     }else{
       dates="/"+ moment(self.data.startDate).format("YYYY-MM-DD")+"/"+moment(self.data.endDate).format("YYYY-MM-DD")
     }
      return self.$q.all([

        self.$http.get(self.utsaSchedRestUrl + "/flight"+dates),
      ]).then(function success(result) {

        self.data.flights = (result[0].data.sort(sortFlights));
      });
    };


    var parseEvents = (schedule)=> {
      var events = []
      if (schedule.Flights) {
        var arrayLength = schedule.Flights.length;
        for (var i = 0; i < arrayLength; i++) {
          var event = {}
          event.title = schedule.Flights[i].Lesson + " - " + schedule.Flights[i].Resource
          if (schedule.Flights[i].Status.indexOf("Cancelled") > -1) {
            event.type = 'important'
          } else {
            event.type = 'success'
          }

          event.startsAt = new Date(schedule.Flights[i].EventStart)
          event.endsAt = new Date(schedule.Flights[i].EventStop)
          events.push(event)
        }
      }
      if (schedule.AcademicLessons) {
        arrayLength = schedule.AcademicLessons.length;
        for (var i = 0; i < arrayLength; i++) {
          var event = {}
          event.title = schedule.AcademicLessons[i].Unit + ' - ' + schedule.AcademicLessons[i].Resource
          if (schedule.AcademicLessons[i].Status.indexOf("Cancelled") > -1) {
            event.type = 'important'
          } else {
            event.type = 'info'
          }

          event.startsAt = new Date(schedule.AcademicLessons[i].EventStart)
          event.endsAt = new Date(schedule.AcademicLessons[i].EventStop)
          events.push(event)
        }
      }
      return events
    }
    var sortFlights = (a, b)=> {
      return moment(a.EventStart).diff(moment(b.EventStart))
    }
    var fetchCondition = function () {
      return self.$q.all([
        self.$http.get(self.utsaSchedRestUrl + "/condition"),
      ]).then(function success(result) {

        self.data.condition = result[0].data;
      });
    };

    var fetchENDUMetarTaf = function () {
      return self.$q.all([
        self.$http({
          url:self.utsaSchedRestUrl + "/weather/",
          method: 'GET',
        }),
      ]).then(function success(result) {
          var weatherData = result[0].data.aviationProducts;
        self.data.endu.metar = weatherData.meteorologicalAerodromeReport[weatherData.meteorologicalAerodromeReport.length-1].metarText.replace(/(\r\n|\n|\r)/gm,"");
        self.data.endu.taf = weatherData.terminalAerodromeForecast[weatherData.terminalAerodromeForecast.length-1].tafText.replace(/(\r\n|\n|\r)/gm,"");

      });
    };
    var refresh = ()=> {
      this.deferred = this.fetchAll();
      this.deferredCond = fetchCondition();
      this.deferredMetar = fetchENDUMetarTaf();
    };
    this.deferred = this.fetchAll();
    this.deferredCond = fetchCondition();
    this.deferredMetar = fetchENDUMetarTaf();
    $interval(refresh, 30000);

  }


}


UtsaSchedScheduleService.$inject = ['$http', 'utsaSchedRestUrl', '$q', '$interval'];

export default UtsaSchedScheduleService;
