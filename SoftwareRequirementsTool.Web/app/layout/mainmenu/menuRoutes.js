app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/projects");

    $stateProvider
        .state("projects", {
            url: "/projects",
            templateUrl: "/app/features/projects/projects-page.html"
        })

        .state("requirements", {
            url: "/requirements",
            templateUrl: "/app/features/requirements/requirements-page.html"
        })

        .state("diagrams", {
            url: "/diagrams",
            templateUrl: "/app/features/diagrams/diagrams-page.html"
        })

        .state("modelling", {
            url: "/modelling",
            templateUrl: "/app/features/modelling/modelling-page.html"
        });

});
