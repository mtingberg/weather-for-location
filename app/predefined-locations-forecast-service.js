'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('predefinedLocationsForecastService',
    function ($http) {
        var cachedWeatherForecastsPromise,
            cachedWeatherForecasts;

        cachedWeatherForecastsPromise = $http.get('/api/forecast/predefined/location/all')
            .success(function (data) {
                cachedWeatherForecasts = data;
            })
            .error(function () {
                console.error('Lookup of \'predefined locations forecast\' failed');
            });

        return {
            forecastPromise: cachedWeatherForecastsPromise,
            getAll: function () {
                return cachedWeatherForecasts;
            }
        };
    });
