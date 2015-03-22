(function () {
    'use strict';

    angular
        .module('app')
        .directive('useCase', useCase);

    useCase.$inject = ['$window', '$compile'];

    function useCase($window, $compile) {
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
                usecaseview: "=usecaseview"
            }

        };

        return directive;


        function link(scope, element, attrs) {
            //element.on("click", function() {
            //    alert("clicked")
            //});

            //angular.element(element).on("click", function() {
            //    alert("sa")
            //})

            //d3.select(element[0]).append("svg");

            
            var drag = d3.behavior.drag()
                .on("dragstart", function (d) {
                    //do some drag start stuff...
                    //this : actual element

                })
                .on("drag", function (d) {
                    //hey we're dragging, let's update some stuff

                    //var x = scope.usecaseview.diagram.x;
                    //var y = scope.usecaseview.diagram.y;

                    //x += d3.event.dx;
                    //y += d3.event.dy;

                    //scope.usecaseview.diagram.x = x;
                    //scope.usecaseview.diagram.y = y;

                    //scope.$apply();

                    var sel = d3.select(this);
                    var x = sel.attr('x');
                    var y = sel.attr('y');

                    sel.attr("x", parseInt(x) + d3.event.dx);
                    sel.attr("y", parseInt(y) + d3.event.dy);

                    scope.usecaseview.diagram.x = parseInt(x);
                    scope.usecaseview.diagram.y = parseInt(y);

                })
                .on("dragend", function () {
                    //we're done, end some stuff
                    
                });



            d3.selectAll(".draggable").call(drag);


        }


    }

})();