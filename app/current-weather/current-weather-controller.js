'use strict';

var angular = require('angular'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
    i18nIsoCountries = require('i18n-iso-countries');


angular.module('app').controller('CurrentWeatherCtrl', function ($scope, forecastFactory) {
    new Promise(function (resolve, reject) {

        function success(position) {
            resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
        }

        function error() {
            reject('Unable to retrieve location');
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }).then(function (position) {
        forecastFactory.getCurrentWeatherForPosition(position).then(function (data) {
            $scope.forecast = {
                weatherIcon: lookupWeatherIcon(data.weather[0].icon),
                city: data.name,
                country: i18nIsoCountries.getName(data.sys.country, 'en'),
                currentTemperature: Math.round(parseInt(data.main.temp, 10)),
                temperatureUnit: 'C'
            };
        });
    });
});
