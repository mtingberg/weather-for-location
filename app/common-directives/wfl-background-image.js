'use strict';

var angular = require('angular');

angular.module('app').directive('wflBackgroundImage', function () {
    return function (scope, element, attrs) {
        var image = attrs.wflBackgroundImage,
            imageFilename,

            // Need to spell out full file names for correctly being picked up by file revving
            lookupTable = {
                '260114': '260114.jpg',
                '745044': '745044.jpg',
                '1277333': '1277333.jpg',
                '1816670': '1816670.jpg',
                '1850147': '1850147.jpg',
                '2147714': '2147714.jpg',
                '2643743': '2643743.jpg',
                '3435910': '3435910.jpg',
                '3451190': '3451190.jpg',
                '5128581': '5128581.jpg',
                '5391959': '5391959.jpg',
                'my-location': 'my-location.jpg'
            };

        if (lookupTable[image]) {
            imageFilename = lookupTable[image];
        } else {
            imageFilename = 'kolmarden.jpg';
        }

        element.css({
            'background-image': 'url(/assets/images/' + imageFilename + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size': 'cover'
        });
    };
});
