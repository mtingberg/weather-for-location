'use strict';

var expect = require('chai').expect;


describe('Mod1', function () {
    var mod1;

    before(function () {
        mod1 = require('./mod1')();
    });

    describe('square', function () {
        it('should return the argument value squared', function () {
            var n = mod1.square(2);
            expect(n).to.equal(4);
        });
    });

    describe('add', function () {
        it('should return the sum of the argument values', function () {
            var n = mod1.add(2, 4);
            expect(n).to.equal(6);
        });
    });
});
