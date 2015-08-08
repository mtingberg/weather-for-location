'use strict';

var angular = require('angular');


module.exports = angular.module('app').controller('DailyForecastCtrl',
    function ($scope, $routeParams, currentLocationForecastService, predefinedLocationsForecastService) {

        var allForecasts = [],
            currentLocationForecast = currentLocationForecastService.get(),
            predefinedLocationsForecast = predefinedLocationsForecastService.getAll();

        allForecasts.push(currentLocationForecast);
        allForecasts = allForecasts.concat(predefinedLocationsForecast);

        allForecasts.forEach(function (elem) {
            if (elem.location.id.toString() === $routeParams.id) {
                $scope.location = elem.location;
                $scope.currentDayForecast = elem.currentDayForecast;
                $scope.futureForecasts = elem.futureForecasts;
            }
        });
    });
