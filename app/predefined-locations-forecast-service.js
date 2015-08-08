'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('predefinedLocationsForecastService',
    function ($http/*, $interval*/) {
        var cachedWeatherForecastsPromise,
            cachedWeatherForecasts;

        cachedWeatherForecastsPromise = $http.get('/api/forecast/predefined/location/all')
            .success(function (data) {
                cachedWeatherForecasts = data;
            })
            .error(function () {
                console.error('Lookup of \'predefined locations forecast\' failed');
            });

/*
        updateCachedWeatherForecasts();
        $interval(updateCachedWeatherForecasts, 1000 * 60 * 10);

        function updateCachedWeatherForecasts() {
            cachedWeatherForecastsPromise = $http.get('/api/weather-forecasts/all');

            cachedWeatherForecasts = cachedWeatherForecastsPromise.then(function (data) {
                return data;
            });
        }

*/
        return {
            forecastPromise: cachedWeatherForecastsPromise,
            getAll: function () {
                return cachedWeatherForecasts;
            }
        };
    });
