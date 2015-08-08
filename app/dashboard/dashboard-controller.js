'use strict';

var angular = require('angular');


module.exports = angular.module('app').controller('DashboardCtrl',
    function ($scope, currentLocationForecastService, predefinedLocationsForecastService) {

        var allForecasts = [],
            currentLocationForecast = currentLocationForecastService.get(),
            predefinedLocationsForecast = predefinedLocationsForecastService.getAll();

        allForecasts.push(currentLocationForecast);
        allForecasts = allForecasts.concat(predefinedLocationsForecast);

        $scope.forecasts = allForecasts;
    });
