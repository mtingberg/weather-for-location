'use strict';

var angular = require('angular');

/*
 Note: use angular.mock.module('...') instead of module('...')
 See: https://github.com/xdissent/karma-browserify/issues/10
 */

describe('DashboardCtrl', function () {
    var $controller,
        currentLocationForecastService,
        predefinedLocationsForecastService;

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.module(function ($provide) {
        currentLocationForecastService = {
            get: function () {
                return {
                    location: {}, currentDayForecast: {}, futureForecasts: []
                };
            }
        };
        $provide.value('currentLocationForecastService', currentLocationForecastService);

        predefinedLocationsForecastService = {
            getAll: function () {
                return [
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []},
                    {location: {}, currentDayForecast: {}, futureForecasts: []}
                ];
            }
        };
        $provide.value('predefinedLocationsForecastService', predefinedLocationsForecastService);
    }));

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.forecasts', function () {
        it('the number of forecasts returned is equal to 12', function () {
            var $scope = {};
            $controller('DashboardCtrl', {$scope: $scope});

            expect($scope.forecasts.length).toEqual(12);
        });
    });
});
