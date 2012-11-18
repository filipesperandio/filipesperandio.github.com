'use strict';

clockApp.controller('MainCtrl', function($scope, $http, $timeout) {

  var updateTime = function() {
    getTime('GMT', function(time) {
      $scope.time = time;
      $scope.$apply();
    });
  };

  updateTime();
  setInterval(updateTime, 30000);


  $scope.timezone = function(zone) {
    var time = $scope.time;
    if(time) {
      var hour = time.getUTCHours() + zone;
      return hour + ":" + time.getMinutes();
    } else {
      return "";
    }
  };

});
