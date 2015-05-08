(function () {
    "use strict";

    function diagramsService(stateMachineService, $sessionStorage, $q) {

        var service = CoreServices.diagramsServiceInstance;
        var baseService =
            new ServiceParts.BaseCrudOpenCloseService(service, $sessionStorage, stateMachineService.ACTIVE_DIAGRAM_KEY,
            function (diagram) {

                var useCaseViewJqPr = CoreServices.useCaseDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);
                var actorViewJqPr = CoreServices.actorDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);
                var connectionViewJqPr = CoreServices.connectionDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);

                $q.all(
                    $q.when(useCaseViewJqPr),
                    $q.when(actorViewJqPr),
                    $q.when(connectionViewJqPr))
                    .then(function (ok) {
                        stateMachineService.openDiagram(diagram);
                    }, function (reason) {
                        console.log(reason);
                    }).catch(function (err) {
                        console.log(err);
                    });

            });

        function close(diagram) {
            baseService.close(diagram);
            stateMachineService.closeDiagram(diagram);

            //TODO: clear Diagram parts, etc.

        }

        function open(diagram) {
            baseService.open(diagram);

        }

        function isActive(diagram) {
            return baseService.isActive(diagram);
        }

        function getActive() {
            return baseService.getActive();
        }

        function create(diagram) {
            baseService.create(diagram);
        }

        function modify(diagram) {
            baseService.modify(diagram);
        }

        function deleteEntity(diagram) {
            baseService.deleteEntity(diagram);
        }

        //activates

        //public interface
        this.isActive = isActive;
        this.getActive = getActive;
        this.open = open;
        this.close = close;
        this.modify = modify;
        this.delete = deleteEntity;
        this.create = create;

        //privates
        //...

    }

    angular
        .module("app")
        .service("diagramsService", diagramsService);

    diagramsService.$inject = ["stateMachineService", "$sessionStorage", "$q"];
})();