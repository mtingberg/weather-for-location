'use strict';

module.exports = function (str) {
    str = str.toLowerCase();
    return uppercaseFirstLetter(str);
};

function uppercaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
