(function () {
    'use strict';

    angular.module('app')
        .filter('filter01', filter01);

    function filter01() {
        return function (input /*, filter parameters*/) {

            var modifiedOutput = input + 5;

            return modifiedOutput;
        }
    }


})();
