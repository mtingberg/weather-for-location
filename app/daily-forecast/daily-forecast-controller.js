'use strict';

var angular = require('angular'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
    isDayTime = require('../is-day-time'),
    unixTimestamp = require('unix-timestamp'),
    moment = require('moment'),
    i18nIsoCountries = require('i18n-iso-countries');


module.exports = angular.module('app').controller('DailyForecastCtrl', function ($scope, forecastFactory) {
    new Promise(function (resolve, reject) {

        function success(position) {
            resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
        }

        function error() {
            reject('Unable to retrieve location');
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }).then(function (position) {
        forecastFactory.getDailyForecastForPosition(position).then(function (data) {
            var list = [],
                forecast = {},
                weatherConditionCode = '',
                isDayTimeAtLocation = '';

            forecast.city = data.city.name;
            forecast.country = i18nIsoCountries.getName(data.city.country, 'en');

            data.list.forEach(function (elem) {
                weatherConditionCode = elem.weather[0].id;
                isDayTimeAtLocation = isDayTime(elem.weather[0].icon);

                list.push({
                    forecastDate: moment(unixTimestamp.toDate(elem.dt)).format('ddd D[/]M'),
                    weatherIcon: lookupWeatherIcon(weatherConditionCode, isDayTimeAtLocation),
                    dayTemperature: Math.round(parseInt(elem.temp.day, 10)),
                    temperatureUnit: 'C'
                });
            });
            forecast.list = list;

            $scope.forecast = forecast;
        });
    });
});
