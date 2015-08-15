'use strict';

var Promise = require('bluebird'),
    config = require('config'),

    forecastContainer = require('../forecast-container')(),
    formatCurrentDayForecast = require('./format-current-day-forecast'),
    formatForecastLocation = require('../format-forecast-location'),
    xhrFetch = require('../xhr-request-retry'),
    logger = require('../logger')(),

    openWeatherMapAppId = config.get('OpenWeatherMap.appId'),
    CURRENT_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';


module.exports = {
    getAll: function () {
        var cityIds = createCityIdArray(forecastContainer),
            currentDayForecastPromises = getCurrentDayForecastData(cityIds);

        if (openWeatherMapAppId === 'demo') {
            logger.info('openWeatherMapAppId === \'demo\'');
        }

        return Promise.all(currentDayForecastPromises).then(function (currentDayForecasts) {
            currentDayForecasts.forEach(function (elem) {
                if (elem && elem.cod === 200) {
                    forecastContainer[elem.id].currentDayForecast =
                        formatCurrentDayForecast(elem, forecastContainer[elem.id].ianaTimeZoneDBName);
                    forecastContainer[elem.id].location = formatForecastLocation(elem);
                }
            });

            return new Promise(function (resolve) {
                resolve(forecastContainer);
            });

        }, function (err) {
            logger.error(err.message);
        });
    },

    getForecastForLocation: function (cityId) {
        var cityIds = [{
                id: cityId
            }],
            ianaTimeZoneDBName = undefined,     // Value not used for current gps location
            currentDayForecastPromise = getCurrentDayForecastData(cityIds);

        if (openWeatherMapAppId === 'demo') {
            logger.info('openWeatherMapAppId === \'demo\'');
        }

        return Promise.all(currentDayForecastPromise).then(function (forecasts) {
            var forecast = forecasts[0];

            if (forecast && forecast.cod === 200) {
                return new Promise(function (resolve) {
                    resolve({
                        currentDayForecast: formatCurrentDayForecast(forecast, ianaTimeZoneDBName),
                        location: formatForecastLocation(forecast)
                    });
                });
            }

        }, function (err) {
            logger.error(err.message);
        });
    }
};

function createCityIdArray(forecastsObj) {
    return Object.keys(forecastsObj).map(function (elem) {
        return {id: elem};
    });
}

function getCurrentDayForecastData(cityIds) {
    return cityIds.map(function (elem) {
        return getCurrentWeatherForCityId(elem.id);
    });
}

function getCurrentWeatherForCityId(id) {
    return xhrFetch(CURRENT_FORECAST_BASE_URL, {
        id: id,
        units: 'metric',
        mode: 'json',
        APPID: openWeatherMapAppId
    });
}
