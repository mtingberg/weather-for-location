'use strict';

var Promise = require('bluebird'),
    config = require('config'),

    forecastContainer = require('../forecast-container')(),
    formatFutureForecast = require('./format-future-forecast'),
    logger = require('../logger')(),
    xhrFetch = require('../xhr-request-retry'),

    openWeatherMapAppId = config.get('OpenWeatherMap.appId'),
    DAILY_FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';


module.exports = {
    getAll: function () {
        var cityIds = createCityIdArray(forecastContainer),
            dailyForecastPromises = getDailyForecastsData(cityIds);

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
            dailyForecastPromise = getDailyForecastsData(cityIds);

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
    return xhrFetch(DAILY_FORECAST_BASE_URL, {
        id: id,
        units: 'metric',
        cnt: 9,
        mode: 'json',
        APPID: openWeatherMapAppId
    });
}
