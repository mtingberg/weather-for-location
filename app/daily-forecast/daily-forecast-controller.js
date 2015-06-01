'use strict';

var angular = require('angular'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
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
                forecast = {};

            forecast.city = data.city.name;
            forecast.country = i18nIsoCountries.getName(data.city.country, 'en');

            data.list.forEach(function (elem) {
                list.push({
                    forecastDate: moment(unixTimestamp.toDate(elem.dt)).format('ddd D[/]M'),
                    weatherIcon: lookupWeatherIcon(elem.weather[0].icon),
                    dayTemperature: Math.round(parseInt(elem.temp.day, 10)),
                    temperatureUnit: 'C'
                });
            });
            forecast.list = list;

            $scope.forecast = forecast;
        });
    });
});
