'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    Promise = require('bluebird');

chai.use(sinonChai);


describe('weather-service-forecast', function () {
    var weatherServiceForecast;

    before(function () {
        weatherServiceForecast = require('./weather-service-forecast');

        weatherServiceForecast.getAll = sinon.stub().returns(
            new Promise(function (resolve) {
                resolve({
                        '260114': {},
                        '745044': {},
                        '1277333': {},
                        '1816670': {},
                        '1850147': {},
                        '2147714': {},
                        '2643743': {},
                        '3435910': {},
                        '3451190': {},
                        '5128581': {},
                        '5391959': {}
                    }
                );
            })
        );
    });

    describe('getAll', function () {
        var cachedWeatherForecasts;

        before(function (done) {
            weatherServiceForecast.getAll().then(function (forecasts) {
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
});
