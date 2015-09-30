'use strict';

var angular = require('angular');

/*
 Note: use angular.mock.module('...') instead of module('...')
 See: https://github.com/xdissent/karma-browserify/issues/10
 */

describe('weatherService', function () {
    var weatherService, $httpBackend;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function (_weatherService_, _$httpBackend_) {
        weatherService = _weatherService_;
        $httpBackend = _$httpBackend_;
    }));

    describe('isAvailable', function () {
        it('should return 200 on status \'ok\'', function(done) {
            $httpBackend.whenGET('/api/weather-service/is-available')
                .respond('ok');

            weatherService.isAvailable().then(function (result) {
                expect(result.data).toEqual(200);
                done();
            });

            $httpBackend.flush();
        });

        it('should return 404 on status \'not found\'', function (done) {
            $httpBackend.whenGET('/api/weather-service/is-available')
                .respond('not found');

            weatherService.isAvailable().then(function (result) {
                expect(result.data).toEqual(404);
                done();
            });

            $httpBackend.flush();
        });

        it('should return 500 on status \'null\'', function (done) {
            $httpBackend.whenGET('/api/weather-service/is-available')
                .respond('null');

            weatherService.isAvailable().then(function (result) {
                expect(result.data).toEqual(500);
                done();
            });

            $httpBackend.flush();
        });

    });
});
