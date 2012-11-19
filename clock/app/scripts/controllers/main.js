'use strict';

clockApp.controller('MainCtrl', function($scope) {
  var time = 0;

  var updateTime = function() {
    getTime('GMT', function(_time) { time = _time; $scope.$apply() });
  };


  $scope.timezone = function(zone) {
    if(time) {
      var hour = time.getUTCHours() + zone;
      var date = new Date();
      date.setHours(hour);
      date.setMinutes(time.getMinutes());
      return date.toLocaleTimeString();
    } else {
      return null;
    }
  };

  updateTime();
});
