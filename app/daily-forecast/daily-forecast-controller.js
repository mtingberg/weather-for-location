'use strict';

var angular = require('angular'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
    isDayTime = require('../is-day-time'),
    unixTimestamp = require('unix-timestamp'),
    moment = require('moment'),
    i18nIsoCountries = require('i18n-iso-countries'),
    getPredefinedLocations = require('../get-predefined-locations');


module.exports = angular.module('app').controller('DailyForecastCtrl',
    function ($scope, $q, forecastFactory, locationFactory) {

    var predefinedLocations = getPredefinedLocations();

    $scope.props = {
        locations: predefinedLocations,
        selected: predefinedLocations[0]
    };

    // will be called when selecting a new location in (predefined locations) drop-down menu.
    $scope.props.getSelectedLocation = function (location) {
        getForecastForLocation(location).then(function (formattedForecast) {
            $scope.forecast = formattedForecast;
        });
    };

    (function initializeView() {
        $scope.props.getSelectedLocation($scope.props.selected);
    })();


    function getForecastForLocation(location) {
        var locationPromise,
            forecastPromise;

        if (location.id === -1) {
            locationPromise = locationFactory.getCurrentPosition();
        } else {
            locationPromise = getPredefinedLocationPromise(location);
        }

        forecastPromise = locationPromise.then(function (position) {
            return forecastFactory.getDailyForecastForPosition(position);
        }, function (reason) {
            console.log('Failed: ', reason);
        });

        return forecastPromise.then(function (forecast) {
            return formatForecastResult(forecast);
        }, function (reason) {
            console.log('Failed: ', reason);
        });
    }

    function getPredefinedLocationPromise(position) {
        return $q(function (resolve) {
            resolve({latitude: position.coord.lat, longitude: position.coord.lon});
        });
    }

    function formatDate(timestamp) {
        var forecastDate = unixTimestamp.toDate(timestamp);

        if (moment().isSame(forecastDate, 'day')) {
            return 'Today';
        } else {
            return moment(forecastDate).format('ddd D[/]M');
        }
    }

    function formatForecastResult(forecast) {
        var dailyForecasts,
            location = {},
            weatherConditionCode = '',
            isDayTimeAtLocation = '';

        location.city = forecast.city.name;
        location.country = i18nIsoCountries.getName(forecast.city.country, 'en');

        dailyForecasts = forecast.list.map(function (elem) {
            weatherConditionCode = elem.weather[0].id;
            isDayTimeAtLocation = isDayTime(elem.weather[0].icon);

            return {
                forecastDate: formatDate(elem.dt),
                weatherIcon: lookupWeatherIcon(weatherConditionCode, isDayTimeAtLocation),
                dayTemperature: Math.round(parseInt(elem.temp.day, 10)),
                temperatureUnit: 'C'
            };
        });

        return {
            city: location.city,
            country: location.country,
            list: dailyForecasts
        };
    }
});
