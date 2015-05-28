'use strict';

var angular = require('angular');

require('angular-route');
require('angular-resource');

angular.module('app', [
    'ngRoute',
    'ngResource'
]);

require('./forecast-factory');
angular.module('app').$inject = ['forecastFactory'];

require('./current-weather/current-weather-controller');


// Define routing for the application
angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'current-weather/view.html',
            controller: 'CurrentWeatherCtrl'
        })
        .when('/current-weather', {
            templateUrl: 'current-weather/view.html',
            controller: 'CurrentWeatherCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});