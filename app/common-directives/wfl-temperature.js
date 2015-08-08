'use strict';

var angular = require('angular');

angular.module('app').directive('wflTemperature', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: './common-directives/wfl-temperature.html',
        link: function (scope, element, attrs) {
            scope.degrees = attrs.degrees;
        }
    };
});
