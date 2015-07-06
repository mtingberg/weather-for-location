'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('locationFactory', function ($q) {
    return {
        getCurrentPosition: function () {
            return $q(function (resolve, reject) {
                function success(position) {
                    resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
                }

                function error() {
                    reject('Unable to retrieve location');
                }

                navigator.geolocation.getCurrentPosition(success, error);
            });
        }
    };
});
