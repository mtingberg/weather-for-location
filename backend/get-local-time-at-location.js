'use strict';

var momentTZ = require('moment-timezone');


module.exports = getLocalTimeAtLocation;

function getLocalTimeAtLocation(ianaTimeZoneDBName) {
    if (!ianaTimeZoneDBName) {
        // The 'IANA TimeZone Database name' is only set for predefined locations
        // (and is set to 'undefined' for the current gps location).
        return momentTZ();
    } else {
        return momentTZ().tz(ianaTimeZoneDBName);
    }
}
