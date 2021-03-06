'use strict';

var heatIndex = require('heat-index'),
    getAndFormatLocalTimeAtLocation = require('../get-and-format-local-time-at-location'),
    getLocalTimeAtLocation = require('../get-local-time-at-location'),
    isDayTimeAtLocation = require('../is-day-time-at-location'),
    lookupWeatherIcon = require('../lookup-weather-icon'),
    logger = require('../logger')(),
    formatForecastText = require('../format-forecast-text');

module.exports = formatCurrentDayForecast;

function formatCurrentDayForecast(forecast, ianaTimeZoneDBName) {
    var weatherConditionCode = forecast.weather[0].id,

    // The formula used for heat index calculation is not valid for temperatures less than
    // 27 degrees celsius, see: https://en.wikipedia.org/?title=Heat_index#History
        feelsLikeTemperature = heatIndex.heatIndex({
            temperature: parseFloat(forecast.main.temp),
            humidity: parseInt(forecast.main.humidity, 10)
        });

    logger.debug('formatCurrentDayForecast,  \'raw\' forecast data: ', forecast);

    return {
        forecastTime: getAndFormatLocalTimeAtLocation(ianaTimeZoneDBName),
        dayTemperature: Math.round(parseInt(forecast.main.temp, 10)),
        forecastText: formatForecastText(forecast.weather[0].description),
        humidity: forecast.main.humidity,
        windSpeed: Math.round(parseInt(forecast.wind.speed, 10)),
        feelsLikeTemperature: Math.round(feelsLikeTemperature),
        weatherIcon: lookupWeatherIcon(weatherConditionCode,
            isDayTimeAtLocation({
                    sunrise: forecast.sys.sunrise,
                    sunset: forecast.sys.sunset,
                    ianaTimeZoneDBName: ianaTimeZoneDBName
                },
                getLocalTimeAtLocation)
        )
    };
}
