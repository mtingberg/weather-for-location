'use strict';

var winston = require('winston'),
    moment = require('moment');

module.exports = function () {
    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                timestamp: function () {
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                },

                formatter: function (options) {
                    // Return string will be passed to the logger.
                    return options.timestamp() + ' '
                        + options.level.toUpperCase() + ' '
                        + (undefined !== options.message ? options.message : '')
                        + (options.meta && Object.keys(options.meta).length ? '\n\t'
                        + JSON.stringify(options.meta) : '' );
                },

                level: 'info'
            })
        ]
    });
};
