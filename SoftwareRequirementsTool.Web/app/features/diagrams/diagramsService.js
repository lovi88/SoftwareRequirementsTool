(function () {
    "use strict";

    function diagramsService(stateMachineService) {

        var service = CoreServices.diagramsServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);

        function close(diagram) {
            stateMachineService.closeDiagram(diagram);
        }

        function open(diagram) {
            stateMachineService.openDiagram(diagram);
        }

        function isActive(diagram) {
            return stateMachineService.isActiveDiagram(diagram);
        }

        function getActive() {
            return stateMachineService.activeDiagram;
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

    diagramsService.$inject = ["stateMachineService"];
})();