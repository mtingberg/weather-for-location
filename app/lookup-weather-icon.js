'use strict';

module.exports = lookupWeatherIcon;

// Ref: http://erikflowers.github.io/weather-icons/


function lookupWeatherIcon(weatherConditionCode, isDayTime) {
    var icons = {
        // Thunderstorm (day time)
        '200': 'wi-day-thunderstorm',   // thunderstorm with light rain
        '201': 'wi-day-thunderstorm',   // thunderstorm with rain
        '202': 'wi-thunderstorm',       // thunderstorm with heavy rain
        '210': 'wi-day-lightning',      // light thunderstorm
        '211': 'wi-thunderstorm',       // thunderstorm
        '212': 'wi-lightning',          // heavy thunderstorm
        '221': 'wi-day-thunderstorm',   // ragged thunderstorm
        '230': 'wi-day-thunderstorm',   // thunderstorm with light drizzle
        '231': 'wi-day-thunderstorm',   // thunderstorm with drizzle
        '232': 'wi-day-thunderstorm',   // thunderstorm with heavy drizzle

        // Drizzle
        '300': 'wi-sprinkle',           // light intensity drizzle
        '301': 'wi-sprinkle',           // drizzle
        '302': 'wi-sprinkle',           // heavy intensity drizzle
        '310': 'wi-sprinkle',           // light intensity drizzle rain
        '311': 'wi-sprinkle',           // drizzle rain
        '312': 'wi-sprinkle',           // heavy intensity drizzle rain
        '313': 'wi-day-sprinkle',       // shower rain and drizzle
        '314': 'wi-showers',            // heavy shower rain and drizzle
        '321': 'wi-day-sprinkle',       // shower drizzle

        // Rain
        '500': 'wi-sprinkle',           // light rain
        '501': 'wi-day-rain',           // moderate rain
        '502': 'wi-rain-wind',          // heavy intensity rain
        '503': 'wi-rain',               // very heavy rain
        '504': 'wi-rain',               // extreme rain
        '511': 'wi-day-hail',           // freezing rain
        '520': 'wi-day-showers',        // light intensity shower rain
        '521': 'wi-showers',            // shower rain
        '522': 'wi-showers',            // heavy intensity shower rain
        '531': 'wi-day-rain-mix',       // ragged shower rain

        // Snow
        '600': 'wi-snow',               // light snow
        '601': 'wi-snow',               // snow
        '602': 'wi-snow',               // heavy snow
        '611': 'wi-sleet',              // sleet
        '612': 'wi-day-sleet',          // shower sleet
        '615': 'wi-day-sleet',          // light rain and snow
        '616': 'wi-sleet',              // rain and snow
        '620': 'wi-day-snow',           // light shower snow
        '621': 'wi-day-snow',           // shower snow
        '622': 'wi-snow-wind',          // heavy shower snow

        // Atmosphere
        '701': 'wi-fog',                // mist
        '711': 'wi-smoke',              // smoke
        '721': 'wi-day-haze',           // haze
        '731': 'wi-dust',               // sand, dust whirls
        '741': 'wi-fog',                // fog
        '751': 'wi-dust',               // sand
        '761': 'wi-dust',               // dust
        '762': 'wi-smog',               // volcanic ash
        '771': 'wi-cloudy-gusts',       // squalls
        '781': 'wi-tornado',            // tornado

        // Clouds
        '800': 'wi-day-sunny',          // clear sky
        '801': 'wi-day-sunny-overcast', // few clouds
        '802': 'wi-day-sunny-overcast', // scattered clouds
        '803': 'wi-day-cloudy',         // broken clouds
        '804': 'wi-cloudy',             // overcast clouds

        // Extreme weather conditions
        '900': 'wi-tornado',            // tornado
        '901': 'wi-hurricane',          // tropical storm
        '902': 'wi-hurricane',          // hurricane
        '903': 'wi-snowflake-cold',     // cold
        '904': 'wi-hot',                // hot
        '905': 'wi-strong-wind',        // windy
        '906': 'wi-hail',               // hail

        // Additional
        '951': 'wi-day-sunny',          // calm
        '952': 'wi-windy',              // light breeze
        '953': 'wi-windy',              // gentle breeze
        '954': 'wi-day-cloudy-windy',   // moderate breeze
        '955': 'wi-windy',              // fresh breeze
        '956': 'wi-cloudy-gusts',       // strong breeze
        '957': 'wi-cloudy-gusts',       // high wind, near gale
        '958': 'wi-strong-wind',        // gale
        '959': 'wi-strong-wind',        // severe gale
        '960': 'hurricane',             // storm
        '961': 'hurricane',             // violent storm
        '962': 'hurricane'              // hurricane
    };

    if (icons.hasOwnProperty(weatherConditionCode) && icons[weatherConditionCode]) {
        if (!isDayTime) {
            return getAlternativeNightTimeIcon(icons[weatherConditionCode]);
        } else {
            return icons[weatherConditionCode];
        }
    } else {
        return 'wi-day-rain-mix';
    }
}

function getAlternativeNightTimeIcon(iconName) {
    var icons = {
        'wi-day-sunny': 'wi-night-clear',
        'wi-day-rain': 'wi-night-alt-rain',
        'wi-sprinkle': 'wi-night-alt-sprinkle',
        'wi-cloudy-gusts': 'wi-night-alt-cloudy-gusts',
        'wi-day-thunderstorm': 'wi-night-thunderstorm',
        'wi-day-lightning': 'wi-night-alt-lightning',
        'wi-showers': 'wi-night-alt-showers',
        'wi-day-snow': 'wi-night-alt-snow',
        'wi-cloudy': 'wi-night-alt-cloudy',
        'wi-day-cloudy': 'wi-night-alt-cloudy',
        'wi-sleet': 'wi-night-alt-sleet',
        'wi-day-sleet': 'wi-night-alt-sleet',
        'wi-day-storm-showers': 'wi-night-alt-storm-showers',
        'wi-fog': 'wi-night-fog',
        'wi-snow-wind': 'wi-night-alt-snow-wind',
        'wi-day-cloudy-windy': 'wi-night-alt-cloudy-windy',
        'wi-day-rain-mix': 'wi-night-alt-rain-mix'
    };

    if (icons.hasOwnProperty(iconName)) {
        return icons[iconName];
    } else {
        return 'wi-night-alt-rain-mix';
    }
}
