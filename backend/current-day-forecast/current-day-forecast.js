'use strict';

var Promise = require('bluebird'),
    config = require('config'),

    // Use 'request-retry' instead of (e.g.) 'request-promise' to better deal with
    // various network errors, such as 'ESOCKETTIMEDOUT'.
    // Put a promise wrapper around 'request-retry' since using the node callback style format.
    request = Promise.promisify(require('requestretry')),

    forecastContainer = require('../forecast-container')(),
    formatCurrentDayForecast = require('./format-current-day-forecast'),
    formatForecastLocation = require('../format-forecast-location'),
    logger = require('../logger')(),

    CURRENT_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

module.exports = {
    getAll: function () {
        var cityIds = createCityIdArray(forecastContainer),
            currentDayForecastPromises = getCurrentDayForecastData(cityIds),
            openWeatherMapAppId = config.get('OpenWeatherMap.appId');

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
            currentDayForecastPromise = getCurrentDayForecastData(cityIds),
            openWeatherMapAppId = config.get('OpenWeatherMap.appId');

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
    return request({
        // request-retry npm module specific params
        url: CURRENT_FORECAST_BASE_URL,
        json: true,

        // request npm module params
        qs: {
            id: id,
            units: 'metric',
            mode: 'json',
            APPID: config.get('OpenWeatherMap.appId')
        },
        pool: {
            // Fix for 'Error: socket hang up', caused by making several requests in a row.
            maxSockets: Infinity
        },
        timeout: 5000,

        // request-retry npm module specific params
        maxAttempts: 5,
        retryDelay: 2000
    })
        .spread(function (err, response) {
            return response;

        }, function (err) {
            logger.error(err.message);
        })
        .catch(TypeError, ReferenceError, function (err) {
            // will end up here on programmer error
            logger.error(err.message);

        }).catch(function (err) {
            // catch any unexpected errors
            logger.error(err.message);
        });
}
