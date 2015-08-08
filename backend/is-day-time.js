'use strict';

module.exports = isDayTime;

function isDayTime(openWeatherMapIconCode) {
    var re = /^\d+?[n]/;  // e.g.: 10d or 10n

    // Also return true in case of malformed icon codes.
    return !re.test(openWeatherMapIconCode);
}
