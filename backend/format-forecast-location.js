'use strict';

var i18nIsoCountries = require('i18n-iso-countries');

module.exports = formatForecastLocation;

function formatForecastLocation(forecast) {
    return {
        id: forecast.id,
        city: forecast.name,
        country: i18nIsoCountries.getName(forecast.sys.country, 'en'),
        image: forecast.id
    };
}
