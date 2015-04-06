(function () {
    'use strict';

    var app = angular.module("app", [
        // Angular modules 
        "ui.router"

        // Custom modules 

        // 3rd Party Modules
    ]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/projects");

        $stateProvider
            .state("projects", {
                url: "/projects",
                templateUrl: "/app/layout/projects-page/projects-page.html"
            })

            .state("projects.active", {
                url: "/projects/:projectId"
            })

            .state("requirements", {
                url: "/requirements",
                templateUrl: "/app/layout/requirements-page/requirements-page.html"
            })

            .state("modelling", {
                url: "/modelling",
                templateUrl: "/app/layout/modelling-page/modelling-page.html"
            });

    });

})();
