'use strict';

var momentTZ = require('moment-timezone');


module.exports = getLocalTimeAtLocation;

function getLocalTimeAtLocation(ianaTimeZoneDBName) {
    if (!ianaTimeZoneDBName) {
        // The 'IANA TimeZone Database name' is only set for predefined locations
        // (and is hence undefined for the current gps location).
        return momentTZ().format('YYYY-MM-DD[T]HH:mm:ss');
    } else {
        return momentTZ().tz(ianaTimeZoneDBName).format('YYYY-MM-DD[T]HH:mm:ss');
    }
}
