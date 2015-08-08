'use strict';

var forecastLocations = require('./assets/app-data/predefined-forecast-locations.json');

module.exports = function () {
    var locationsObj = {};

    forecastLocations.forEach(function (elem) {
        locationsObj[elem.id] = {
            location: {},
            currentDayForecast: {},
            futureForecasts: {},
            ianaTimeZoneDBName: elem.ianaTimeZoneDBName
        };
    });

    return locationsObj;
};
