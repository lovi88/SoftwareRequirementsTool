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


            //var modellingCanvas = $("#modelling-canvas");

            //var realWidth = modellingCanvas.width();
            //var realHeight = modellingCanvas.height();

            //modellingCanvas.attr("width", realWidth);
            //modellingCanvas.attr("height", realHeight);
        }

        function postLink() {

        }
    }

})();