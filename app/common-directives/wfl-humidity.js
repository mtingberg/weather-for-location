'use strict';

var angular = require('angular');

angular.module('app').directive('wflHumidity', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './common-directives/wfl-humidity.html',
        link: function (scope, element, attrs) {
            scope.humidityLevel = attrs.level;
        }
    };
});
