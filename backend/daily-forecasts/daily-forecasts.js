'use strict';

var Promise = require('bluebird'),
    config = require('config'),

    // Use 'request-retry' instead of (e.g.) 'request-promise' to better deal with
    // various network errors, such as 'ESOCKETTIMEDOUT'.
    // Put a promise wrapper around 'request-retry' since using the node callback style format.
    request = Promise.promisify(require('requestretry')),

    forecastContainer = require('../forecast-container')(),
    formatFutureForecast = require('./format-future-forecast'),
    logger = require('../logger')(),

    DAILY_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';


module.exports = {
    getAll: function () {
        var cityIds = createCityIdArray(forecastContainer),
            dailyForecastPromises = getDailyForecastsData(cityIds),
            openWeatherMapAppId = config.get('OpenWeatherMap.appId');

        if (openWeatherMapAppId === 'demo') {
            logger.info('openWeatherMapAppId === \'demo\'');
        }

        return Promise.all(dailyForecastPromises).then(function (dailyForecasts) {
            dailyForecasts.forEach(function (elem) {
                if (elem && elem.cod === '200') {
                    forecastContainer[elem.city.id].futureForecasts = formatFutureForecast(elem);
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
            dailyForecastPromise = getDailyForecastsData(cityIds),
            openWeatherMapAppId = config.get('OpenWeatherMap.appId');

        if (openWeatherMapAppId === 'demo') {
            logger.info('openWeatherMapAppId === \'demo\'');
        }

        return Promise.all(dailyForecastPromise).then(function (forecasts) {
            var forecast = forecasts[0];

            if (forecast && forecast.cod === '200') {
                return new Promise(function (resolve) {
                    resolve({
                        futureForecasts: formatFutureForecast(forecast)
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
        return { id: elem };
    });
}


function getDailyForecastsData(cityIds) {
    return cityIds.map(function (elem) {
        return getDailyForecastsForCityId(elem.id);
    });
}

function getDailyForecastsForCityId(id) {
    return request({
        // request-retry npm module specific params
        url: DAILY_FORECAST_BASE_URL,
        json: true,

        // request npm module params
        qs: {
            id: id,
            units: 'metric',
            cnt: 9,
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
        .spread(function(err, response) {
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
