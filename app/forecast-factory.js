'use strict';

var angular = require('angular');

angular.module('app').factory('forecastFactory', function ($http) {

    var OPEN_WEATHER_MAP_API_KEY = 'f8dc9e2b6acd93f0a57b4abf0e86ecad',
        OPEN_WEATHER_MAP_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

    return {
        getForecastForPosition: function (position) {
            return new Promise(function (resolve, reject) {
                $http.get(OPEN_WEATHER_MAP_BASE_URL, {
                    params: {
                        lat: position.latitude,
                        lon: position.longitude,
                        units: 'metric',
                        APPID: OPEN_WEATHER_MAP_API_KEY
                    },
                    responseType: 'json',
                    timeout: 500
                })
                    .success(function (data) {
                        resolve(data);
                    })

                    .error(function (data, status) {
                        console.error('$http.get failed, status:' + status);
                        reject('$http.get failed, status:' + status);
                    });
            })

                .then(function (data) {
                    return data;
                    /*
                     self.storeWeatherDataInCache(data);
                     self.applyCachedWeatherData();
                     */
                }, function (message) {
                    console.warn(message);
                    /*
                     self.applyCachedWeatherData();
                     */
                })

                .catch(function (message) {
                    console.error(message);
                });
        }
    };
});
