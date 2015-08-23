'use strict';

var getLocalTimeAtLocation = require('./get-local-time-at-location');

module.exports = getAndFormatLocalTimeAtLocation;

/*
    The purpose of this module is to return a time string from a 'Moment' that will
    be correctly recognized by the frontend framework as a valid date string.
 */

function getAndFormatLocalTimeAtLocation(ianaTimeZoneDBName) {
    return getLocalTimeAtLocation(ianaTimeZoneDBName).format('YYYY-MM-DD[T]HH:mm:ss');
}
