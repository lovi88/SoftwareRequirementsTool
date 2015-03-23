(function () {
    'use strict';

    angular
        .module('app')
        .controller('testCtrl', testCtrl);

    testCtrl.$inject = ['$scope'];

    function testCtrl($scope) {
        /* jshint validthis:true */

        $scope.title = 'testCtrl';

        var diagram = {
            x: 10,      //x of containing svg
            y: 10,
            width: 302, //w/h of the containing svg
            height: 102,
            cx: 151,    //center of the ellipse
            cy: 51,
            rx: 150,    //radius
            ry: 50,
            center_x: 10,
            center_y: 10
        }

        var elementText = {
            x: 160,
            y: 55,
            text: "Text"
        }

        var diagram2 = {
            x: 100,      //x of containing svg
            y: 100,
            width: 302, //w/h of the containing svg
            height: 102,
            cx: 151,    //center of the ellipse
            cy: 51,
            rx: 150,    //radius
            ry: 50,
            center_x: 10,
            center_y: 10
        }

        var elementText2 = {
            x: 160,
            y: 55,
            text: "Text2alma"
        }


        $scope.usecaseview = {
            diagram: diagram,
            elementText: elementText
        }

        $scope.alma = {
            diagram: diagram2,
            elementText: elementText2
        }


        $scope.sc1 = {
            name: "sc1",
            num: 5

        }

        $scope.sc2 = {
            name: "sc2",
            num: 10

        }

        activate();

        function activate() { }
    }
})();
