'use strict';

module.exports = lookupWeatherIcon;

function lookupWeatherIcon(code) {
    var icons = {
        '01d': 'wi-day-sunny',
        '01n': 'wi-night-clear',  	        // clear sky
        '02d': 'wi-day-cloudy',
        '02n': 'wi-night-alt-cloudy',  	    // few clouds
        '03d': 'wi-cloudy',
        '03n': 'wi-night-alt-cloudy',  	    // scattered clouds
        '04d': 'wi-cloudy',
        '04n': 'wi-night-alt-cloudy',  	    // broken clouds
        '09d': 'wi-day-showers',
        '09n': 'wi-night-alt-showers',      // shower rain
        '10d': 'wi-rain',
        '10n': 'wi-night-alt-rain',         // rain
        '11d': 'wi-day-lightning',
        '11n': 'wi-night-alt-lightning',    // thunderstorm
        '13d': 'wi-snow-wind',
        '13n': 'wi-snow-wind',  	        // snow
        '50d': 'wi-fog',
        '50n': 'wi-fog'  	                // mist
    };

    if (icons.hasOwnProperty(code)) {
        return icons[code];
    } else {
        return 'wi-day-rain-mix';
    }
}
