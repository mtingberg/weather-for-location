#!/usr/bin/env node
'use strict';

var express = require('express'),
    path = require('path'),
    weatherServiceForecast = require('./backend/weather-service-forecast'),
    config = require('config'),
    logger = require('./backend/logger')(),
    cachedWeatherForecasts = null;

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, config.get('Deployment.distributionDir'), 'app')));

express.static.mime.define({'application/x-font-ttf': ['ttf']});

app.listen(app.get('port'));
logger.info('Express server listening on port ' + app.get('port'));


updateCachedWeatherForecasts();
setInterval(updateCachedWeatherForecasts, 1000 * 60 * 10);

function updateCachedWeatherForecasts() {
    weatherServiceForecast.getAll().then(function (forecasts) {
        cachedWeatherForecasts = forecasts;
        logger.info('Forecasts retrieved from weather service.');
        logger.debug(cachedWeatherForecasts);
    });
}

function getForecastsAsArray(forecastsObj) {
    var cityIds = Object.keys(forecastsObj);

    return cityIds.map(function (cityId) {
        return {
            location: forecastsObj[cityId].location,
            currentDayForecast: forecastsObj[cityId].currentDayForecast,
            futureForecasts: forecastsObj[cityId].futureForecasts
        };
    });
}


app.get('/api/forecast/location/:cityId', function(request, response) {
    var cityId = request.params.cityId;

    weatherServiceForecast.getForecastForLocation(cityId).then(function (forecast) {
        if (forecast) {
            response.send(forecast);
        } else {
            logger.warn('Lookup of /api/forecast/location/' + cityId + ' failed.');
            response.sendStatus(404);
        }

    }, function (error) {
        response.sendStatus(500);
        logger.error(error);
    });
});

app.get('/api/forecast/predefined/location/:cityId', function(request, response) {
    var cityId = request.params.cityId.toLowerCase();   // In case of non-numeric 'cityId' param.

    if (cityId === 'all') {
        response.send(getForecastsAsArray(cachedWeatherForecasts));

    } else {
        if (!cachedWeatherForecasts[cityId]) {
            logger.warn('Lookup of /api/forecast/predefined/location/' + cityId + ' failed.');
            response.sendStatus(404);
        } else {
            response.send(cachedWeatherForecasts[cityId]);
        }
    }
});

app.get('/api/forecast/predefined/location/:cityId/:section', function(request, response) {
    var cityId = request.params.cityId.toLowerCase(),
        section = request.params.section;

    if (cachedWeatherForecasts[cityId] && cachedWeatherForecasts[cityId][section]) {
        response.send(cachedWeatherForecasts[cityId][section]);
    } else {
        logger.warn('Lookup of /api/forecast/predefined/location/' + cityId + '/' + section + ' failed.');
        response.sendStatus(404);
    }
});
