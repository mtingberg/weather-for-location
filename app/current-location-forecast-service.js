'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('currentLocationForecastService',
    function ($http, locationService) {
        var cachedWeatherForecastPromise,
            cachedWeatherForecast;

        var cityIdPromise = locationService.getCurrentCityId();

        cachedWeatherForecastPromise = cityIdPromise.then(function (cityId) {
            return $http.get('/api/forecast/location/' + cityId)
                .then(function (forecast) {
                    forecast.data.location.image = 'my-location';
                    cachedWeatherForecast = forecast.data;
                }, function () {
                    console.error('Lookup of \'current location forecast\' failed');
                });
        });

        return {
            forecastPromise: cachedWeatherForecastPromise,
            get: function () {
                return cachedWeatherForecast;
            }
        };
    });
