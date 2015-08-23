#!/usr/bin/env node

'use strict';

var yargs = require('yargs'),
    momentTZ = require('moment-timezone');

main();

function main() {
    var argv = parseOptions(),
        timestamp = argv._[0],
        ianaTimeZoneName = argv._[1],
        utcDate = momentTZ.unix(timestamp),
        localTime = utcDate.clone();

    console.log('Timestamp:\t', timestamp);
    console.log('UTC:\t\t', utcDate.format('YYYY-MM-DD HH:mm:ss'));
    console.log('Local time:\t', localTime.tz(ianaTimeZoneName).format('YYYY-MM-DD HH:mm:ss'));
}

function parseOptions() {
    var argv = yargs
        .usage('Usage: $0: [UNIX_TIMESTAMP] [IANA_TIMEZONE_NAME]')
        .demand(2)

        .argv;

    return argv;
}
