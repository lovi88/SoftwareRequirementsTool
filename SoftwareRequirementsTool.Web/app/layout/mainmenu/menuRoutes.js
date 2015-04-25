app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/projects");

    $stateProvider
        .state("projects", {
            url: "/projects",
            templateUrl: "/app/layout/projects-page/projects-page.html"
        })

        .state("requirements", {
            url: "/requirements",
            templateUrl: "/app/layout/requirements-page/requirements-page.html"
        })

        .state("diagrams", {
            url: "/diagrams",
            templateUrl: "/app/layout/diagrams-page/diagrams-page.html"
        })

        .state("modelling", {
            url: "/modelling",
            templateUrl: "/app/layout/modelling-page/modelling-page.html"
        });

});
