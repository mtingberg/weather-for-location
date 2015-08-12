'use strict';

module.exports = function () {
    function square(n) {
        return n * n;
    }

    function add(a, b) {
        return a + b;
    }

    return {
        square: square,
        add: add
    }
};
