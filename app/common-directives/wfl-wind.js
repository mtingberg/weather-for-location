'use strict';

var angular = require('angular');

angular.module('app').directive('wflWind', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './common-directives/wfl-wind.html',
        link: function (scope, element, attrs) {
            scope.windSpeed = attrs.speed;
        }
    };
});
