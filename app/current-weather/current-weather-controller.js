'use strict';

var angular = require('angular'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
    isDayTime = require('../is-day-time'),
    i18nIsoCountries = require('i18n-iso-countries');


module.exports = angular.module('app').controller('CurrentWeatherCtrl',
    function ($scope, $q, forecastFactory, locationFactory) {

        var locationPromise,
            improvedLocationInfoPromise,
            intermediateForecastPromise,
            forecastPromise,
            currentPosition,    // TODO: remove
            currentCity;        // TODO: remove

        locationPromise = locationFactory.getCurrentPosition();

        intermediateForecastPromise = locationPromise.then(function (position) {
            currentPosition = position;     // TODO: get via promise value instead
            return forecastFactory.getDailyForecastForPosition(position);
        }, function (reason) {
            console.log('Failed: ', reason);
        });

        improvedLocationInfoPromise = intermediateForecastPromise.then(function (data) {
            currentCity = data.city.name;   // TODO: get via promise value instead
            return {
                position: currentPosition,  // TODO: get via promise value instead
                city: data.city.name
            };
        }, function (reason) {
            console.log('Failed: ', reason);
        });

        forecastPromise = improvedLocationInfoPromise.then(function (locationInfo) {
            return forecastFactory.getCurrentWeatherForPosition(locationInfo.position);
        });

        forecastPromise.then(function (data) {
            var weatherConditionCode = data.weather[0].id,
                isDayTimeAtLocation = isDayTime(data.weather[0].icon);

            $scope.forecast = {
                weatherIcon: lookupWeatherIcon(weatherConditionCode, isDayTimeAtLocation),
                city: currentCity,  // TODO: get via promise value instead
                country: i18nIsoCountries.getName(data.sys.country, 'en'),
                currentTemperature: Math.round(parseInt(data.main.temp, 10)),
                temperatureUnit: 'C'
            };
        });

/*
        new Promise(function (resolve, reject) {

            function success(position) {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }

            function error() {
                reject('Unable to retrieve location');
            }

            navigator.geolocation.getCurrentPosition(success, error);

        }).then(function (position) {
                // This step is a workaround due to that the OpenWeatherMap api's 'current weather forecast'
                // returns the location with two decimals precision only, and hence retrieves an incorrect
                // (but nearby) location in some cases.
                // Calling OpenWeatherMap 'daily forecast' is used since this api call retrieves the location
                // with a higher precision (i.e. uses full number of decimals returned from
                // navigator.geolocation.getCurrentPosition() ).

                return forecastFactory.getDailyForecastForPosition(position).then(function (data) {
                    return {
                        position: position,
                        city: data.city.name
                    };
                });

            }).then(function (locationInfo) {
                forecastFactory.getCurrentWeatherForPosition(locationInfo.position).then(function (data) {
                    var weatherConditionCode = data.weather[0].id,
                        isDayTimeAtLocation = isDayTime(data.weather[0].icon);

                    $scope.forecast = {
                        weatherIcon: lookupWeatherIcon(weatherConditionCode, isDayTimeAtLocation),
                        city: locationInfo.city,
                        country: i18nIsoCountries.getName(data.sys.country, 'en'),
                        currentTemperature: Math.round(parseInt(data.main.temp, 10)),
                        temperatureUnit: 'C'
                    };
                });
            });
*/
    });
