(function() {
    "use strict";

    function actor () {
        // Usage:
        //     <actor></actor>
        // Creates:
        // 
        function link(scope, element, attrs) {
            scope.diagramElement.applyDraggable(element);
        }

        var directive = {
            restrict: "EA",
            templateUrl: "/app/features/modelling/parts/actor.svg",
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
        .directive("actor", actor);

    //actor.$inject = [""];
})();