'use strict';

var angular = require('angular'),
    getPredefinedLocations = require('../get-predefined-locations');


module.exports = angular.module('app').controller('wflLocationsCtrl', function ($scope) {

    var props = {};

    props.printLocation = function (location) {
        console.log(location);
    };

    props.locations = getPredefinedLocations();

    props.selected = props.locations[0];

    $scope.props = props;
});
