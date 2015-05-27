'use strict';

var angular = require('angular'),
    //apiKey = 'f8dc9e2b6acd93f0a57b4abf0e86ecad',
    lund = 'http://api.openweathermap.org/data/2.5/weather?q=Lund,se';

angular.module('app').controller('CurrentWeatherCtrl', function ($scope, $http) {
    $http.get(lund).
        success(function (data) {
            $scope.weatherData = data;
            console.log(data);
        }).
        error(function () {
            console.error('Lookup of \'' + lund + '\' failed');
        });
});
