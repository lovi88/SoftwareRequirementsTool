(function () {
    'use strict';

    angular
        .module('app')
        .directive('useCase', useCaseDir);

    //useCase.$inject = ['$window', '$compile'];

    function useCaseDir() {
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

            scope.$watch('diagramElement.view.x', function (oldVal, newVal) {
                if (oldVal===newVal) {
                    return;
                }
                
                scope.diagramElement.view.recalculateCenter();
            });

            scope.$watch('diagramElement.view.y', function (oldVal, newVal) {
                if (oldVal === newVal) {
                    return;
                }

                scope.diagramElement.view.recalculateCenter();
            });

            scope.diagramElement.view.applyDraggable(element);

        }

    }

})();