'use strict';

var angular = require('angular');

angular.module('app').directive('wflDotsSeparator', function () {
    return {
        restrict: 'E',
        scope: {},
        template: '<div class="db-separator">...</div>'
    };
});
