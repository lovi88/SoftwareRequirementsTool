(function () {
    "use strict";

    function actorsService($http) {

        var service = CoreServices.actorServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);

        var actorNames = [];
        function initActorNames(actors) {
            Utils.ArrayHelpers.clearArray(actorNames);

            for (var i = 0; i < actors.length; i++) {
                Utils.ArrayHelpers.pushIfNotInArray(actorNames, actors[i].Name);
            }
        }


        function getActorForName(name) {
            var act = null;

            for (var i = 0; i < service.actors.length; i++) {
                if (service.actors[i].Name === name) {
                    act = service.actors[i];
                    break;
                }
            }

            return act;
        }


        function getFreshActor(name) {
            var actor = new Entities.BaseElement();
            actor.ContainerProject = CoreServices.projectsServiceInstance.active;

            if (!(Utils.TypeChecker.isUndefinedOrNull(name))) {
                actor.Name = name;
            }

            return actor;
        }


        //init
        service.registerChangeListenerCallback(function (source, changedEntity) {
            initActorNames(service.actors);
        });

        initActorNames(service.actors);


        //Public Interface
        this.actors = service.actors;
        this.actorNames = actorNames;
        this.getActorForName = getActorForName;

        this.create = function(act, callback) {
            baseService.create(act,callback);
        }
            
        this.modify = baseService.modify;
        this.deleteEntity = baseService.deleteEntity;
        this.getFreshActor = getFreshActor;
    }

    angular
        .module("app")
        .service("actorsService", actorsService);

    actorsService.$inject = ["$http"];
})();