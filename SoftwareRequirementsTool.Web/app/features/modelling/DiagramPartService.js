(function () {
    "use strict";

    function diagramPartService($http) {

        var service = CoreServices.userStoryServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);

        this.create = baseService.create;
        this.modify = baseService.modify;
        this.deleteEntity = baseService.deleteEntity;

    }

    angular
        .module("app")
        .service("diagramPartService", diagramPartService);

    //diagramPartService.$inject = ["$http"];
})();