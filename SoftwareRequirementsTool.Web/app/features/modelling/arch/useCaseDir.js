(function () {
    'use strict';

    function useCaseDir(draggingService) {
        // Usage:
        //     <use-case></use-case>
        // Creates: A UseCase diagram element
        // 

        var directive = {
            restrict: 'EA',
            templateUrl: "/app/features/modelling/useCase.svg",
            templateNamespace: 'svg',
            link: link,
            replace: true,

            scope: {
                diagramElement: "="
            }

        };

        return directive;

        function link(scope, element, attrs) {
            var view = scope.diagramElement.view;

            draggingService.applyDraggable(element, view);

            var draggingListener = {
                occured: function (from, data) {
                    scope.diagramElement.view.recalculateCenter();
                    scope.$apply();
                }
            }

            draggingService.addDraggingEventListener(view, draggingListener);
        }

    }

    angular
        .module('app')
        .directive('useCase', useCaseDir);

    useCaseDir.$inject = ["draggingService"];
})();