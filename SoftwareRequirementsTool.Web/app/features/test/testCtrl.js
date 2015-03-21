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

        $scope.usecaseview = {
            diagram: diagram,
            elementText: elementText
        }

        activate();

        function activate() { }
    }
})();
