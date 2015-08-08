'use strict';

var unixTimestamp = require('unix-timestamp'),
    getLocalTimeAtLocation = require('./get-local-time-at-location'),
    momentTZ = require('moment-timezone');


module.exports = isDayTimeAtLocation;

/*
    Note:

    The method used for determining whether it is daytime at the actual location, i.e. the current
    local time is between sunrise and sunset, uses a certain level of simplification.

    Since the time of sunrise and sunset returned from the weather service is related to the date
    of the forecast, only the time part only is used for the calculation (and may differ a minute
    or two in case of the forecast is related to the previous day).

    I.e.: only the hour, minutes and seconds part, of the local: 'current time', 'sunrise' and
    'sunset' is used for the calculation.
 */

function isDayTimeAtLocation(params) {
    var localTimeAtLocation = createMomentBasedOnTimePartOfLocalTimeAtLocation(params.ianaTimeZoneDBName),
        sunrise = createMomentBasedOnTimePartOfUnixTimestamp(params.sunrise, params.ianaTimeZoneDBName),
        sunset = createMomentBasedOnTimePartOfUnixTimestamp(params.sunset, params.ianaTimeZoneDBName);

    return momentTZ(localTimeAtLocation).isBetween(sunrise, sunset);
}

function createMomentBasedOnTimePartOfLocalTimeAtLocation(ianaTimeZoneDBName) {
    var localTimeAtLocationWithoutDate =
            momentTZ(getLocalTimeAtLocation(ianaTimeZoneDBName)).format('HH:mm:ss'),

        momentFromTimePartOnly = momentTZ(localTimeAtLocationWithoutDate, 'HH:mm:ss');

    return momentFromTimePartOnly;
}

function createMomentBasedOnTimePartOfUnixTimestamp(timestamp, ianaTimeZoneDBName) {
    var localTimeAtLocationWithoutDate =
            momentTZ.tz(unixTimestamp.toDate(timestamp), ianaTimeZoneDBName).format('HH:mm:ss'),

        momentFromTimePartOnly = momentTZ(localTimeAtLocationWithoutDate, 'HH:mm:ss');

    return momentFromTimePartOnly;
}
