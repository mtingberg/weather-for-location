'use strict';

var angular = require('angular'),
    getInternationalLocations = require('../get-international-locations');


module.exports = angular.module('app').controller('InternationalLocationsCtrl', function ($scope) {
    $scope.locations = getInternationalLocations();
});
