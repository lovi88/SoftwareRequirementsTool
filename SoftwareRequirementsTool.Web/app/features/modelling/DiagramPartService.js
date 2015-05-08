(function () {
    "use strict";

    function diagramPartService($q) {
        var privates = {};

        var actorViewService = CoreServices.actorDiagramPartServiceInseance;
        var usecaseViewService = CoreServices.useCaseDiagramPartServiceInseance;
        var connectionViewService = CoreServices.connectionDiagramPartServiceInseance;


        this.createFreshActorPart = function (element) {
            var view = privates.createFreshView(element);

            var deferred = $q.defer();

            actorViewService.create(view, function (cr) {
                deferred.resolve(cr);
            });

            return deferred.promise;
        }


        privates.createFreshView = function (element) {
            var view = new Entities.BaseView();
            view.Name = element.Name;
            view.ContainerProject = CoreServices.ProjectsService.getInstance().active;

            view.Diagram = CoreServices.DiagramService.getInstance().active;
            view.Element = element;

            return view;
        }

        this.actorParts = actorViewService.diagramParts;
        this.usecaseParts = usecaseViewService.diagramParts;
        this.connectionParts = connectionViewService.diagramParts;
    }

    angular
        .module("app")
        .service("diagramPartService", diagramPartService);

    diagramPartService.$inject = ["$q"];
})();