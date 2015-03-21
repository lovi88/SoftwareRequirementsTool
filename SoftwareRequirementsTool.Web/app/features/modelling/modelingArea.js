(function () {
    'use strict';

    angular
        .module('app')
        .directive('modelingArea', modelingArea);

    modelingArea.$inject = ['$window'];

    function modelingArea($window) {
        // Usage:
        //     <modeling-area></modeling-area>
        // Creates: a canvas#modelling-canvas

        var directive = {
            controller: controller,
            compile: compile,
            restrict: 'EA',
            templateUrl: "/app/features/modelling/modelling-area.html",
            //templateNamespace:'svg',

            scope: {
                sizeX: "=",
                sizeY: "=",
                startX: "=",
                startY: "="
            }

        };
        return directive;

        function controller($scope) {
            
        }

        function compile(tElement, attrs) {

            return {
                pre: preLink,
                post: postLink
            }
        }

        function preLink() {
            console.log("compile.tElement: \n")

            //var modellingCanvas = $("#modelling-canvas");

            //var realWidth = modellingCanvas.width();
            //var realHeight = modellingCanvas.height();

            //modellingCanvas.attr("width", realWidth);
            //modellingCanvas.attr("height", realHeight);
        }

        function postLink() {
            
            console.log("link.element: \n")


            var canvas = new fabric.Canvas('modelling-canvas');
            canvas.backgroundColor = 'rgba(0,0,255,0.3)';

            // create a rectangle with angle=45
            var rect = new fabric.Rect({
                left: 100,
                top: 100,
                fill: 'red',
                width: 20,
                height: 20,
                angle: 45
            });

            canvas.add(rect);
        }
    }

})();