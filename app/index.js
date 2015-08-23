'use strict';

var angular = require('angular');

require('angular-route');
require('angular-mocks');

angular.module('app', [
    'ngRoute'
]);

require('./location-service');
require('./current-location-forecast-service');
require('./predefined-locations-forecast-service');

require('./daily-forecast/daily-forecast-controller');
require('./dashboard/dashboard-controller');

require('./common-directives/wfl-humidity');
require('./common-directives/wfl-wind');
require('./common-directives/wfl-temperature');
require('./common-directives/wfl-dots-separator');
require('./common-directives/wfl-background-image');

// Define routing for the application
angular.module('app').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'dashboard/view.html',

            // Initialize services at app startup, see:
            //
            // http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data
            // http://plnkr.co/edit/GKg21XH0RwCMEQGUdZKH?p=preview
            // http://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
            resolve: {
                'currentLocationForecastServiceData': function (currentLocationForecastService) {
                    return currentLocationForecastService.forecastPromise;
                },
                'predefinedLocationsForecastServiceData': function (predefinedLocationsForecastService) {
                    return predefinedLocationsForecastService.forecastPromise;
                }
            }
        })
        .when('/daily-forecast/:id', {
            templateUrl: 'daily-forecast/view.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
