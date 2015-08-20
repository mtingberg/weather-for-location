'use strict';

var angular = require('angular');

/*
 Note: use angular.mock.module('...') instead of module('...')
 See: https://github.com/xdissent/karma-browserify/issues/10
 */

describe('DailyForecastCtrl', function () {
    var $controller,
        $routeParams,
        currentLocationForecastService,
        predefinedLocationsForecastService;

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.module(function ($provide) {
        currentLocationForecastService = {
            get: function () {
                return {location: {id: '2693678'}, currentDayForecast: {}, futureForecasts: []};
            }
        };
        $provide.value('currentLocationForecastService', currentLocationForecastService);

        predefinedLocationsForecastService = {
            getAll: function () {
                return [
                    {location: {id: '2643743'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '5128581'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '1816670'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '1850147'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '260114'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '745044'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '5391959'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '1277333'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '3435910'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '3451190'}, currentDayForecast: {}, futureForecasts: []},
                    {location: {id: '2147714'}, currentDayForecast: {}, futureForecasts: []}
                ];
            }
        };
        $provide.value('predefinedLocationsForecastService', predefinedLocationsForecastService);
    }));

    beforeEach(inject(function (_$controller_, _$routeParams_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $routeParams = _$routeParams_;
    }));

    describe('$scope.location', function () {
        it('should contain a current location with id: 2693678', function () {
            var $scope = {};
            $controller('DailyForecastCtrl', {$scope: $scope, $routeParams: {id: '2693678'}});

            expect($scope.location.id).toEqual('2693678');
        });

        it('should contain a predefined location with id: 260114', function () {
            var $scope = {};
            $controller('DailyForecastCtrl', {$scope: $scope, $routeParams: {id: '260114'}});

            expect($scope.location.id).toEqual('260114');
        });
    });
});
