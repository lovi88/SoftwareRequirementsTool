(function () {
    "use strict";

    function diagramsService(stateMachineService, $sessionStorage) {

        var service = CoreServices.diagramsServiceInstance;
        var baseService =
            new ServiceParts.BaseCrudOpenCloseService(service, $sessionStorage, stateMachineService.ACTIVE_DIAGRAM_KEY,
            function (diagram) {
                stateMachineService.openDiagram(diagram);

                //TODO: preload Diagram parts; & views & UseCase-s & connections (or it is downoaded for the project?)
                //.loadAllForEntityToProperty(diagram);


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

    diagramsService.$inject = ["stateMachineService", "$sessionStorage"];
})();