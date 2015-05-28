'use strict';

var angular = require('angular');

angular.module('app').controller('CurrentWeatherCtrl', function (forecastFactory) {
    forecastFactory.getForecastForPosition({'longitude': 13.19, 'latitude': 55.71}).then(function (data) {
        console.log('CurrentWeatherCtrl', data);
    });
});
