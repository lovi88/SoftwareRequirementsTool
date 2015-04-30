(function () {
    "use strict";

    function actorsService($http) {

        var service = CoreServices.actorServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);

        var actorNames = [];
        function initActorNames(actors) {
            Utils.ArrayHelpers.clearArray(actorNames);

            for (var i = 0; i < actors.length; i++) {
                actorNames.push(actors[i].Name);
            }
        }


        function getActorForName(name) {
            var act = null;

            for (var i = 0; i < service.actors.length; i++) {
                if (service.actors[i].Name === name) {
                    act = scope.actors[i];
                    break;
                }
            }

            return act;
        }


        //init
        if (CoreServices.projectsServiceInstance.active != null) {
            service.loadAllForEntityToProperty(CoreServices.projectsServiceInstance.active, function (allEntities) {
                initActorNames(service.actors);
            });
        }

        service.registerChangeListenerCallback(function (source, changedEntity) {
            initActorNames(service.actors);
        });


        //Public Interface
        this.actors = service.actors;
        this.actorNames = actorNames;
        this.getActorForName = getActorForName;

        this.create = baseService.create;
        this.modify = baseService.modify;
        this.deleteEntity = baseService.deleteEntity;

    }

    angular
        .module("app")
        .service("actorsService", actorsService);

    actorsService.$inject = ["$http"];
})();