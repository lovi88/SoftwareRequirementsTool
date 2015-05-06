(function () {
    "use strict";

    function mainMenu($window, $compile, stateMachineService) {
        // Usage:
        //     <main-menu></main-menu>
        // Creates:
        // 
        function link(scope, element, attrs) {
            scope.stateMachine = stateMachineService;
        }

        var directive = {
            link: link,
            restrict: "EA",
            templateUrl: "/app/layout/mainmenu/main-menu.html",
            replace: true
        };
        return directive;
    }

    angular
        .module("app")
        .directive("mainMenu", mainMenu);

    mainMenu.$inject = ["$window", "$compile", "stateMachineService"];
})();