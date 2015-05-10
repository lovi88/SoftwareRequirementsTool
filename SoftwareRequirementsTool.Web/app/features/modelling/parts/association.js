(function() {
    'use strict';

    function association () {
        // Usage:
        //     <association></association>
        // Creates:
        // 
        function link(scope, element, attrs) {
            
        }

        var directive = {
            restrict: "EA",
            templateUrl: "/app/features/modelling/parts/association.svg",
            templateNamespace: "svg",
            link: link,
            replace: true,

            scope: {
                diagramElement: "="
            }
        };

        return directive;
    }

    angular
        .module("app")
        .directive("association", association);

    //association.$inject = [""];
})();