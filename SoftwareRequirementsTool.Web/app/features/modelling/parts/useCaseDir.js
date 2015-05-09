(function () {
    "use strict";

    function useCaseDir() {
        // Usage:
        //     <use-case></use-case>
        // Creates: A UseCase diagram element
        // 
        function link(scope, element, attrs) {
            scope.diagramElement.recalculateCenter();
            scope.diagramElement.applyDraggable(element);
        }

        var directive = {
            restrict: "EA",
            templateUrl: "/app/features/modelling/parts/useCase.svg",
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
        .directive("useCase", useCaseDir);

    //useCaseDir.$inject = [""];
})();