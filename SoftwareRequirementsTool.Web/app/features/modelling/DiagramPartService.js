(function () {
    "use strict";

    function diagramPartService($q) {
        var privates = {};

        var actorViewService = CoreServices.actorDiagramPartServiceInseance;
        var usecaseViewService = CoreServices.useCaseDiagramPartServiceInseance;
        var connectionViewService = CoreServices.connectionDiagramPartServiceInseance;


        this.createFreshActorPart = function (element) {
            var view = privates.createFreshActorView(element);

            var deferred = $q.defer();

            actorViewService.create(view, function (cr) {
                deferred.resolve(cr);
            });

            return deferred.promise;
        }

        this.createFreshUseCasePart = function (element) {
            var view = privates.createFreshUseCaseView(element);

            var deferred = $q.defer();

            usecaseViewService.create(view, function (cr) {
                deferred.resolve(cr);
            });

            return deferred.promise;
        }

        this.actorParts = actorViewService.diagramParts;
        this.usecaseParts = usecaseViewService.diagramParts;
        this.connectionParts = connectionViewService.diagramParts;

        privates.createFreshActorView = function (element) {
            var view = new Entities.ActorView();
            privates.initFreshView(view, element);

            return view;
        }

        privates.createFreshUseCaseView = function (element) {
            var view = new Entities.UseCaseView();
            privates.initFreshView(view, element);

            return view;
        }

        privates.initFreshView = function (view, element) {
            view.Name = element.Name;
            view.ContainerProject = CoreServices.ProjectsService.getInstance().active;

            view.Diagram = CoreServices.DiagramService.getInstance().active;
            view.Element = element;

            return view;
        }

    }

    angular
        .module("app")
        .service("diagramPartService", diagramPartService);

    diagramPartService.$inject = ["$q"];
})();