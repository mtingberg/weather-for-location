'use strict';

var angular = require('angular'),
    Buffer = require('buffer/').Buffer;

module.exports = angular.module('app').factory('forecastFactory', function ($http) {

    var OPEN_WEATHER_MAP_APP_ID = new Buffer('ZjhkYzllMmI2YWNkOTNmMGE1N2I0YWJmMGU4NmVjYWQ=', 'base64').toString('ascii'),
        CURRENT_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather',
        DAILY_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

    return {
        getCurrentWeatherForPosition: function (position) {
            return new Promise(function (resolve, reject) {
                $http.get(CURRENT_FORECAST_BASE_URL, {
                    params: {
                        lat: position.latitude,
                        lon: position.longitude,
                        units: 'metric',
                        APPID: OPEN_WEATHER_MAP_APP_ID
                    },
                    responseType: 'json',
                    timeout: 5000
                })
                    .success(function (data) {
                        resolve(data);
                    })

                    .error(function (data, status) {
                        reject('$http.get failed, status:' + status);
                    });
            })

                .then(function (data) {
                    return data;
                }, function (message) {
                    console.warn(message);
                })

                .catch(function (message) {
                    console.error(message);
                });
        },

        getDailyForecastForPosition: function (position) {
            return new Promise(function (resolve, reject) {
                $http.get(DAILY_FORECAST_BASE_URL, {
                    params: {
                        lat: position.latitude,
                        lon: position.longitude,
                        units: 'metric',
                        cnt: 5,
                        mode: 'json',
                        APPID: OPEN_WEATHER_MAP_APP_ID
                    },
                    responseType: 'json',
                    timeout: 5000
                })
                    .success(function (data) {
                        resolve(data);
                    })

                    .error(function (data, status) {
                        reject('$http.get failed, status:' + status);
                    });
            })

                .then(function (data) {
                    return data;
                }, function (message) {
                    console.warn(message);
                })

                .catch(function (message) {
                    console.error(message);
                });
        }
    };
});
