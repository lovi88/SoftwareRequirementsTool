(function() {
    'use strict';

    angular
        .module('app')
        .directive('association', association);

    association.$inject = ['$window'];
    
    function association ($window) {
        // Usage:
        //     <association></association>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/features/modelling/association.svg",
            
            templateNamespace: 'svg',
            link: link,
            replace: true,

            scope: {
                elementFrom: "=",
                elementTo:"="
            }
        };
        return directive;

        //TODO: Line from->to
        //TODO: Line update
        function link(scope, element, attrs) {

        }
    }

})();