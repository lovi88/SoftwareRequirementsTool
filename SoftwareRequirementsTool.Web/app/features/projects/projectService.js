(function () {
    "use strict";

    function projectService(stateMachineService, $q, $sessionStorage) {
        var service = CoreServices.projectsServiceInstance;
        var baseService =
            new ServiceParts.BaseCrudOpenCloseService(service, $sessionStorage, stateMachineService.ACTIVE_PROJECT_KEY,
            function (project) {

                var diagPromise = CoreServices.diagramsServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
                var storyPromise = CoreServices.userStoryServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
                var actorPromise = CoreServices.actorServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);

                //converting to Angular Promises (in order to fire the $apply)
                diagPromise = $q.when(diagPromise);
                storyPromise = $q.when(storyPromise);
                actorPromise = $q.when(actorPromise);

                $q.all([diagPromise, storyPromise, actorPromise]).then(function() {
                    stateMachineService.openProject(project);
                });

            },
            function () {
                CoreServices.diagramsServiceInstance.clear();
                CoreServices.userStoryServiceInstance.clear();
                CoreServices.actorServiceInstance.clear();
            });
        
        function close(project) {
            baseService.close(project);
            stateMachineService.closeProject(project);
        }


        function open(project) {
            baseService.open(project); 
        }

        function isActive(project) {
            return baseService.isActive(project);
        }

        function getActive() {
            return baseService.getActive();
        }

        function create(project) {
            baseService.create(project);
        }

        function modify(project) {
            baseService.modify(project);
        }

        function deleteEntity(project) {
            baseService.deleteEntity(project);
        }
        
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
        .service("projectService", projectService);

    projectService.$inject = ["stateMachineService", "$q", "$sessionStorage"];
})();