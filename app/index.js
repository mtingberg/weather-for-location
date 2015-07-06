'use strict';

var angular = require('angular');

require('angular-route');
require('angular-resource');

angular.module('app', [
    'ngRoute',
    'ngResource'
]);

require('./common-controllers/wfl-locations-controller');
require('./forecast-factory');
require('./location-factory');
require('./current-weather/current-weather-controller');
require('./daily-forecast/daily-forecast-controller');


// Define routing for the application
angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'current-weather/view.html'
        })
        .when('/current-weather', {
            templateUrl: 'current-weather/view.html'
        })
        .when('/daily-forecast', {
            templateUrl: 'daily-forecast/view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
