'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('weatherService', function ($http) {

    function appendTransform(defaults, transform) {
        // We can't guarantee that the default transformation is an array
        defaults = angular.isArray(defaults) ? defaults : [defaults];

        // Append the new transformation to the defaults
        return defaults.concat(transform);
    }

    function isAvailable() {
        return $http({
            url: '/api/weather-service/is-available',
            method: 'GET',
            transformResponse: appendTransform($http.defaults.transformResponse, function (status) {
                status = status.toLowerCase();

                if (status === 'ok') {
                    return 200;
                } else if (status === 'not found') {
                    return 404;
                } else {
                    return 500;
                }
            })

        }).then(function (value) {
            return value;

        }, function (response) {
            return response.data;
        });
    }

    return {
        isAvailable: isAvailable
    };
});
