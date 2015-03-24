(function () {
    'use strict';

    angular
        .module('app')
        .directive('useCase', useCase);

    //useCase.$inject = ['$window', '$compile'];

    function useCase() {
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
                usecaseview: "="
            }

        };

        return directive;

        function save(scope) {

        }

        function link(scope, element, attrs) {

            console.log(scope.usecaseview.elementText.text)

            scope.$watch('usecaseview.diagram.x', function (old_val,new_val) {
                if (old_val==new_val) {
                    return;
                }
                
                refreshCenter(scope.usecaseview.diagram);
            });

            scope.$watch('usecaseview.diagram.y', function (old_val, new_val) {
                if (old_val == new_val) {
                    return;
                }

                refreshCenter(scope.usecaseview.diagram);
            });


            //drag(scope, element);
        }

        function drag(scope, element) {

            var counter = 0;
            var _drag = d3.behavior.drag()
                .on("dragstart", function (d) {
                    //do some drag start stuff...
                    //this : actual element
                    console.log("actual element changed")
                })
                .on("drag", function (d) {
                    //hey we're dragging, let's update some stuff

                    var sel = d3.select(this);
                    var x = sel.attr('x');
                    var y = sel.attr('y');

                    var xNext = parseInt(x) + d3.event.dx;
                    var yNext = parseInt(y) + d3.event.dy;

                    sel.attr("x", xNext);
                    sel.attr("y", yNext);

                    scope.usecaseview.diagram.x = xNext;
                    scope.usecaseview.diagram.y = yNext;

                    scope.$apply();

                    if (++counter % 20 === 0) {
                        //console.log("save")
                        save(scope);
                    }

                })
                .on("dragend", function () {
                    //we're done, end some stuff
                    //save(scope);
                });


            d3.selectAll(element.toArray()).call(_drag);
        }

        function refreshCenter(diagram) {
            diagram.center_x = diagram.x + (diagram.width / 2);
            diagram.center_y = diagram.y + (diagram.height / 2);
        }
    }

})();