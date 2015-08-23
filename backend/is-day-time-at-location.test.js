'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expect = chai.expect,
    isDayTimeAtLocation = require('./is-day-time-at-location'),
    momentTZ = require('moment-timezone');

chai.use(sinonChai);


describe('is-day-time-at-location', function () {
    var stubbedGetLocalTimeAtLocation = sinon.stub();

    before(function () {
        stubbedGetLocalTimeAtLocation.withArgs(undefined)
            .returns(momentTZ('2015-08-16 12:49:45', 'YYYY-MM-DD HH:mm:ss'));

        stubbedGetLocalTimeAtLocation.withArgs('Australia/Sydney')
            // returns '2015-08-16 10:08:45' in local 'Australia/Sydney' time
            .returns(momentTZ('2015-08-16 02:08:45', 'YYYY-MM-DD HH:mm:ss').tz('Australia/Sydney'));

        stubbedGetLocalTimeAtLocation.withArgs('Europe/Athens')
            // returns '2015-08-16 14:24:45' in local 'Europe/Athens' time
            .returns(momentTZ('2015-08-16 13:24:45', 'YYYY-MM-DD HH:mm:ss').tz('Europe/Athens'));
    });

    describe('isDayTimeAtLocation', function () {
        it('should return true for a current local (geo location) time of 12:49:45', function () {
            var isDayTime = isDayTimeAtLocation(
                {
                    sunrise: 1439696464,    // 05:41:04
                    sunset: 1439750430,     // 20:40:30
                    ianaTimeZoneDBName: undefined
                },
                stubbedGetLocalTimeAtLocation
            );

            expect(isDayTime).to.be.true;
        });

        it('should return true for a current local Sydney time of 10:08:45', function () {
            var isDayTime = isDayTimeAtLocation(
                {
                    sunrise: 1439670796,    // 06:26:20
                    sunset: 1439709966,     // 20:00:45
                    ianaTimeZoneDBName: 'Australia/Sydney'
                },
                stubbedGetLocalTimeAtLocation
            );

            expect(isDayTime).to.be.true;
        });

        it('should return true for a current local Athens time of 14:24:45', function () {
            var isDayTime = isDayTimeAtLocation(
                {
                    sunrise: 1439696633,    // 06:43:50
                    sunset: 1439745114,     // 20:11:58
                    ianaTimeZoneDBName: 'Europe/Athens'
                },
                stubbedGetLocalTimeAtLocation
            );

            expect(isDayTime).to.be.true;
        });
    });
});
