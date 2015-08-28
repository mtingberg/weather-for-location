'use strict';

module.exports = removeFailedLocationLookups;

// The weather service occasionally fails to return a forecast for one or more city ids,
// resulting in empty object forecast properties.
// Only include forecasts with all properties being 'non-empty objects' in the result.
function removeFailedLocationLookups(locationForecasts) {
    return locationForecasts.filter(function (elem) {
        return (!isObjectEmpty(elem.location) && !isObjectEmpty(elem.currentDayForecast) && !isObjectEmpty(elem.futureForecasts));
    });
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
