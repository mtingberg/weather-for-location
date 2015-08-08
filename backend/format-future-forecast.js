'use strict';

var unixTimestamp = require('unix-timestamp'),
    isDayTime = require('./is-day-time'),
    lookupWeatherIcon = require('./lookup-weather-icon'),
    formatForecastText = require('./format-forecast-text');

module.exports = formatFutureForecast;

function formatFutureForecast(forecast) {
    var forecastsStartingFromNextDay = removeCurrentDayForecast(forecast);

    return forecastsStartingFromNextDay.list.map(function (elem) {
        var weatherConditionCode = elem.weather[0].id,
            isDayTimeAtLocation = isDayTime(elem.weather[0].icon);

        return {
            forecastDate: unixTimestamp.toDate(elem.dt),
            weatherIcon: lookupWeatherIcon(weatherConditionCode, isDayTimeAtLocation),
            dayTemperature: Math.round(parseInt(elem.temp.day, 10)),
            forecastText: formatForecastText(elem.weather[0].description)
        };
    });
}

function removeCurrentDayForecast(forecast) {
    forecast.list.splice(0, 1);
    return forecast;
}
