(function () {
    "use strict";

    function userStoriesService() {
        var service = CoreServices.userStoryServiceInstance;
        var baseService = ServiceParts.BaseCrudService(service);

        this.create = baseService.create;
        this.modify = baseService.modify;
        this.deleteEntity = baseService.deleteEntity;
    }

    angular
        .module("app")
        .service("userStoriesService", userStoriesService);

    //userStoriesService.$inject = ['$http'];
})();