#!/usr/bin/env node

'use strict';

var yargs = require('yargs'),
    unixTimestamp = require('unix-timestamp');

main();

function main() {
    var argv = parseOptions(),
        timestamp = argv._[0],
        jsDate = unixTimestamp.toDate(timestamp);

    console.log('Timestamp:', timestamp, '=', jsDate);
}

function parseOptions() {
    var argv = yargs
        .usage('Usage: $0: [UNIX TIMESTAMP]')
        .demand(1)

        .argv;

    return argv;
}
