'use strict';

var angular = require('angular');

module.exports = angular.module('app').factory('locationService', function ($http, $q) {
    var OPEN_WEATHER_MAP_APP_ID = require('../config/local.json').OpenWeatherMap.appId,
        DAILY_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily',

        // Get the current position using 'geolocation', continue by getting the current
        // 'city id' by calling OpenWeatherMap's 'daily forecast'. Then use the city id
        // for retrieving current and daily (future) forecasts.
        //
        // Calling 'daily forecast' is used since this api call retrieves the location with a
        // higher precision (i.e. uses full number of decimals returned from
        // navigator.geolocation.getCurrentPosition()) compared to OpenWeatherMap api's
        // 'current weather forecast' which returns the location with two decimals precision only.
        // (Retrieves an incorrect, but nearby, location in some cases).

        locationPromise = getCurrentPosition(),
        currentCityIdPromise = getCityIdFromPosition(locationPromise);


    function getCurrentPosition() {
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

    function getCityIdFromPosition(locationPromise) {
        return locationPromise.then(function (position) {
            return $http.get(DAILY_FORECAST_BASE_URL, {
                params: {
                    lat: position.latitude,
                    lon: position.longitude,
                    units: 'metric',
                    cnt: 1,
                    mode: 'json',
                    APPID: OPEN_WEATHER_MAP_APP_ID
                },
                responseType: 'json',
                timeout: 5000
            });
        })

            .catch(function (message) {
                console.error(message);
            });
    }

    return {
        getCurrentCityId: function () {
            return currentCityIdPromise.then(function (result) {
                if (result.status >= 200 && result.status <= 299) {
                    return result.data.city.id;
                } else {
                    console.error('Lookup of \'city id\' failed', result.statusText);
                }
            });
        }
    };
});


