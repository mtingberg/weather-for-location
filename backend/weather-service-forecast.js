'use strict';

var Promise = require('bluebird'),
    currentDayForecast = require('./current-day-forecast/current-day-forecast'),
    dailyForecasts = require('./daily-forecasts/daily-forecasts'),
    forecastContainer = require('./forecast-container')(),
    moment = require('moment'),
    logger = require('./logger')(),

    cachedLocationForecast = null,
    cachedLocationForecastTimestamp = undefined,
    cachedLocationCityId = undefined;


module.exports = {
    getAll: function () {
        var currentDayForecastPromise = currentDayForecast.getAll(),
            dailyForecastsPromise = dailyForecasts.getAll();

        return Promise.join(currentDayForecastPromise, dailyForecastsPromise,
            function (currentDayForecastObj, dailyForecastsObj) {

                var currentDayForecastIterator = Object.getOwnPropertyNames(currentDayForecastObj),
                    dailyForecastsIterator = Object.getOwnPropertyNames(dailyForecastsObj);

                currentDayForecastIterator.forEach(function (cityId) {
                    forecastContainer[cityId].location = currentDayForecastObj[cityId].location;
                    forecastContainer[cityId].currentDayForecast =
                        currentDayForecastObj[cityId].currentDayForecast;
                });

                dailyForecastsIterator.forEach(function (cityId) {
                    forecastContainer[cityId].futureForecasts = dailyForecastsObj[cityId].futureForecasts;
                });

                return forecastContainer;

            }).catch(function (error) {
                logger.error(error.message);
            });
    },

    getForecastForLocation: function (cityId) {
        var currentDayForecastPromise,
            dailyForecastsPromise;

        if (isSameCityIdAsPreviousRequest(cityId) && isForecastCurrent(cachedLocationForecastTimestamp)) {
            return new Promise(function (resolve) {
                resolve(cachedLocationForecast);
            });

        } else {
            currentDayForecastPromise = currentDayForecast.getForecastForLocation(cityId);
            dailyForecastsPromise = dailyForecasts.getForecastForLocation(cityId);

            return Promise.join(currentDayForecastPromise, dailyForecastsPromise,
                function (currentDayForecastObj, dailyForecastsObj) {

                    if (isCurrentOrDailyForecastLookupFailed(currentDayForecastObj, dailyForecastsObj)) {
                        clearCachedLocationValues();

                    } else {
                        cachedLocationForecastTimestamp = moment();
                        cachedLocationCityId = cityId;
                        cachedLocationForecast = {
                            location: currentDayForecastObj.location,
                            currentDayForecast: currentDayForecastObj.currentDayForecast,
                            futureForecasts: dailyForecastsObj.futureForecasts
                        };
                    }
                    return cachedLocationForecast;

                }).catch(function (error) {
                    logger.error(error.message);
                });
        }
    }
};

function isForecastCurrent(timestamp) {
    if (!timestamp) {
        return false;
    } else {
        return moment(timestamp).isAfter(moment().subtract(1, 'hours'));
    }
}

function isSameCityIdAsPreviousRequest(cityId) {
    return (cityId === cachedLocationCityId);
}

function clearCachedLocationValues() {
    cachedLocationForecastTimestamp = undefined;
    cachedLocationCityId = undefined;
    cachedLocationForecast = null;
}

function isCurrentOrDailyForecastLookupFailed(currentDayForecastObj, dailyForecastsObj) {
    return (!currentDayForecastObj || !dailyForecastsObj);
}
