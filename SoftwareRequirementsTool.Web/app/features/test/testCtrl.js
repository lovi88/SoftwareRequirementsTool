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
            height:102,
            cx: 151,    //center of the ellipse
            cy: 51,
            rx: 150,    //radius
            ry: 50
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
            ry: 50
        }

        var elementText2 = {
            x: 160,
            y: 55,
            text: "Text2"
        }


        $scope.usecaseview = {
            diagram: diagram,
            elementText: elementText
        }

        $scope.usecaseview2 = {
            diagram: diagram2,
            elementText: elementText2
        }

        
        activate();

        function activate() { }
    }
})();
