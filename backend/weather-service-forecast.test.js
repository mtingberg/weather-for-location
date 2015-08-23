'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    Promise = require('bluebird'),
    weatherServiceForecast = require('./weather-service-forecast'),

    currentDayForecastGetAllData =
        require('./assets/app-data/test-data/current-day-forecast-get-all.json'),
    currentDayForecastGetForecastForLocationData =
        require('./assets/app-data/test-data/current-day-forecast-get-forecast-for-location'),
    dailyForecastsGetAllData =
        require('./assets/app-data/test-data/daily-forecasts-get-all.json'),
    dailyForecastsGetForecastForLocationData =
        require('./assets/app-data/test-data/daily-forecasts-get-forecast-for-location.json');

chai.use(sinonChai);


describe('weather-service-forecast', function () {
    var currentDayForecast,
        dailyForecasts;


    before(function () {
        currentDayForecast = require('./current-day-forecast/current-day-forecast');
        dailyForecasts = require('./daily-forecasts/daily-forecasts');

        currentDayForecast.getAll = sinon.stub().returns(
            new Promise(function (resolve) {
                resolve(currentDayForecastGetAllData);
            })
        );

        currentDayForecast.getForecastForLocation = sinon.stub().withArgs(2693555).returns(
            new Promise(function (resolve) {
                resolve(currentDayForecastGetForecastForLocationData);
            })
        );

        dailyForecasts.getAll = sinon.stub().returns(
            new Promise(function (resolve) {
                resolve(dailyForecastsGetAllData);
            })
        );

        dailyForecasts.getForecastForLocation = sinon.stub().withArgs(2693555).returns(
            new Promise(function (resolve) {
                resolve(dailyForecastsGetForecastForLocationData);
            })
        );
    });

    describe('getAll', function () {
        var cachedWeatherForecasts;

        before(function (done) {
            weatherServiceForecast.getAll(currentDayForecast, dailyForecasts).then(function (forecasts) {
                cachedWeatherForecasts = forecasts;
                done();
            });
        });

        it('the number of forecast items returned should equal 11', function () {
            var n = Object.keys(cachedWeatherForecasts).length;
            expect(n).to.equal(11);
        });

        it('the forecast items should have an item with id = 260114', function () {
            expect(cachedWeatherForecasts).to.have.property(260114);
        });
    });

    describe('getForecastForLocation', function () {
        var locationForecast,
            id = 2693555;

        before(function (done) {
            weatherServiceForecast.getForecastForLocation(id, currentDayForecast, dailyForecasts)
                .then(function (forecast) {
                    locationForecast = forecast;
                    done();
                });
        });

        it('the number of future forecast items returned should equal 8', function () {
            var n = locationForecast.futureForecasts.length;
            expect(n).to.equal(8);
        });

        it('the forecast object should have a location property', function () {
            expect(locationForecast).to.have.property('location');
        });
    });
});
