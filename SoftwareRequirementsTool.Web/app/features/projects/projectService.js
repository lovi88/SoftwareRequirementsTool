(function () {
    "use strict";

    function projectService(menuService, notificationService, $q, $sessionStorage) {
        var service = CoreServices.projectsServiceInstance;
        var baseService =
            new ServiceParts.BaseCrudOpenCloseService(service, $sessionStorage, "activeProject",
            function (project) {

                var diagPromise = CoreServices.diagramsServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
                var storyPromise = CoreServices.userStoryServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
                var actorPromise = CoreServices.actorServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);

                //converting to Angfular Promises (in order to fire the $apply)
                diagPromise = $q.when(diagPromise);
                storyPromise = $q.when(storyPromise);
                actorPromise = $q.when(actorPromise);

                $q.all([diagPromise, storyPromise, actorPromise]).then(function() {
                    menuService.openProject();
                });

            },
            function (project) {
                CoreServices.diagramsServiceInstance.clear();
                CoreServices.userStoryServiceInstance.clear();
                CoreServices.actorServiceInstance.clear();
            });
        
        function close(project) {
            baseService.close(project);
            menuService.closeProject();

            notificationService.showInfo(project.Name + "is closed, now the requirements and the modelling menues are deactivated");
        }


        function open(project) {
            baseService.open(project);

            notificationService.showInfo(project.Name + "is opened, now the requirements and the modelling menues are active");
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
        .service("projectService", projectService);

    projectService.$inject = ["menuService", "notificationService", "$q","$sessionStorage"];
})();