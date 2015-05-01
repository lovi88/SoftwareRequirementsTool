(function () {
    'use strict';

    angular
        .module('app')
        .directive('testDirective', testDirective);

    testDirective.$inject = ['$window'];

    function testDirective($window) {
        // Usage:
        //     <testDirective></testDirective>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                sc: "="
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();