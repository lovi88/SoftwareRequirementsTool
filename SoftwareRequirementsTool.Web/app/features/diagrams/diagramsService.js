(function () {
    "use strict";

    function diagramsService(menuService, notificationService, $sessionStorage) {

        var service = CoreServices.diagramsServiceInstance;
        var baseService =
            new ServiceParts.BaseCrudOpenCloseService(service, $sessionStorage, "activeDiagram", function () {
                menuService.openDiagram();

                //TODO: preload Diagram parts

            });

        function close(diagram) {
            baseService.close(diagram);
            menuService.closeDiagram();

            //TODO: clear Diagram parts

            notificationService.showInfo(diagram.Name + "is closed, modelling page is deactivated");
        }

        function open(diagram) {
            baseService.open(diagram);

            service.loadAllForEntityToProperty(diagram);
            notificationService.showInfo(diagram.Name + "is opened, modelling page is activated");
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

    diagramsService.$inject = ["menuService", "notificationService", "$sessionStorage"];
})();