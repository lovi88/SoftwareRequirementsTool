(function() {
    'use strict';

    angular
        .module('app')
        .directive('mainMenu', mainMenu);

    mainMenu.$inject = ['$window','$compile'];
    
    function mainMenu($window, $compile) {
        // Usage:
        //     <main-menu></main-menu>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: "/app/layout/mainmenu/main-menu.html",
            replace: true
        };
        return directive;

        function link(scope, element, attrs) {

        }
    }

})();