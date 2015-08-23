'use strict';

var Promise = require('bluebird'),
    logger = require('./logger')(),

    // Use 'request-retry' instead of (e.g.) 'request-promise' to better deal with
    // various network errors, such as 'ESOCKETTIMEDOUT'.
    // Put a promise wrapper around 'request-retry' since using the node callback style format.
    request = Promise.promisify(require('requestretry'));


module.exports = function (url, requestSpecificParams) {
    return request({
        // request-retry npm module specific params
        url: url,
        json: true,

        // request npm module specific params
        qs: requestSpecificParams,
        pool: {
            // Fix for 'Error: socket hang up', caused by making several requests in a row.
            maxSockets: Infinity
        },
        timeout: 5000,

        // request-retry npm module specific params
        maxAttempts: 5,
        retryDelay: 2000
    })
        .spread(function(err, response) {
            return response;

        }, function (err) {
            logger.error(err.message);
        })
        .catch(TypeError, ReferenceError, function (err) {
            // will end up here on programmer error
            logger.error(err.message);

        }).catch(function (err) {
            // catch any unexpected errors
            logger.error(err.message);
        });
};
