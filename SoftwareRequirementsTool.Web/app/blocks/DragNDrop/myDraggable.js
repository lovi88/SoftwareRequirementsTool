(function() {
    'use strict';

    angular
        .module('app')
        .directive('myDraggable', myDraggable);

    myDraggable.$inject = ['$document'];
    
    function myDraggable($document) {
        // Usage:
        //     <my-draggable></my-draggable>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();