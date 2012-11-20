'use strict';

clockApp.controller('MainCtrl', function($scope) {
  var time = 0;

  var updateTime = function() {
    getTime('GMT', function(_time) { time = _time; $scope.$apply() });
  };


  $scope.timezone = function(zone) {
    var t = time ? time : new Date();
    var utc = t.getUTCHours();
    var hour = utc + zone;
    var date = new Date();
    date.setHours(hour);
    date.setMinutes(t.getMinutes());
    return date.toString("hh:mm:ss tt");
  };

  updateTime();
  setInterval($scope.$apply, 500);
});
