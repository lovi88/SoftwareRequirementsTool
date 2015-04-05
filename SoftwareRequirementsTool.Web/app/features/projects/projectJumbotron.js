(function () {
    'use strict';

    function projectJumbotron($window) {
        // Usage:
        //     <project-jumbotron></project-jumbotron>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: "EA",
            templateUrl: "/app/features/projects/project-jumbotron.html",
            replace: true
        };

        scope: {
            project: "=project"
        }

        return directive;

        function link(scope, element, attrs) {

        }

    }

    angular
        .module("app")
        .directive("projectJumbotron", projectJumbotron);

    projectJumbotron.$inject = ["$window"];
})();