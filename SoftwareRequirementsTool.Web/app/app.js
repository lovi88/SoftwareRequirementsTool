(function () {
    'use strict';

    CoreServices.BaseSignalRService.startConnections(function () {
        console.log("services started");
    });

    var app = angular.module("app", [
        // Angular modules 
        "ui.router",
        "ui.bootstrap"
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

            .state("project", {
                url: "/project/:projectId",
                templateUrl: "/app/layout/project-page/project-page.html",
                controller: "projectController"
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
