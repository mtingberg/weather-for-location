'use strict';

var momentTZ = require('moment-timezone');

module.exports = isDayTimeAtLocation;

/*
    Note:

    The method used for determining whether it is daytime at the actual location, i.e. the current
    local time is between sunrise and sunset, uses a certain level of simplification.

    Since the time of sunrise and sunset returned from the weather service is related to the date
    of the forecast, these are forced to the current date to be aligned with the local time at
    the given location (and hence may differ slightly in case the forecast was created during
    the previous day).
 */

// Inject 'getLocalTimeAtLocation' as a dependency for unit testing purposes.
function isDayTimeAtLocation(params, getLocalTimeAtLocation) {
    var localTimeAtLocation = getLocalTimeAtLocation(params.ianaTimeZoneDBName),
        sunrise = createMomentBasedOnUnixTimestamp(params.sunrise, params.ianaTimeZoneDBName),
        sunset = createMomentBasedOnUnixTimestamp(params.sunset, params.ianaTimeZoneDBName);

    localTimeAtLocation = forceTimeToCurrentDate(localTimeAtLocation);
    sunrise = forceTimeToCurrentDate(sunrise);
    sunset = forceTimeToCurrentDate(sunset);

//    console.log(localTimeAtLocation.format('DD/MM HH:mm:ss'), params.sunrise, sunrise.format('DD/MM HH:mm:ss'), params.sunset, sunset.format('DD/MM HH:mm:ss'));

    return localTimeAtLocation.isBetween(sunrise, sunset);
}

function createMomentBasedOnUnixTimestamp(timestamp, ianaTimeZoneDBName) {
    var momentFromUnixTimestamp = momentTZ.unix(timestamp),
        localTimeAtLocationMoment = momentFromUnixTimestamp;

    // The 'IANA TimeZone Database name' is only set for predefined locations
    // (and is set to 'undefined' for the current gps location).
    if (ianaTimeZoneDBName) {
        localTimeAtLocationMoment = momentFromUnixTimestamp.tz(ianaTimeZoneDBName);
    }

    return localTimeAtLocationMoment;
}

function forceTimeToCurrentDate(timeMoment) {
    var today = momentTZ();

    timeMoment.set('year', today.get('year'));
    timeMoment.set('month', today.get('month'));
    timeMoment.set('date', today.get('date'));

    return timeMoment;
}
