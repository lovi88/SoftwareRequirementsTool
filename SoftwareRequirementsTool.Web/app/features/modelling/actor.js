(function() {
    'use strict';

    angular
        .module('app')
        .directive('actor', actor);

    actor.$inject = ['$window'];
    
    function actor ($window) {
        // Usage:
        //     <actor></actor>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

})();