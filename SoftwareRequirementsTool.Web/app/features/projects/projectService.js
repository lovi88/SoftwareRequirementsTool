(function () {
    "use strict";

    function projectService(stateMachineService) {
        var service = CoreServices.projectsServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);
        
        function close(project) {
            stateMachineService.closeProject(project);
        }

        function open(project) {
            stateMachineService.openProject(project);
        }

        function isActive(project) {
           return stateMachineService.isActiveProject(project);
        }

        function getActive() {
            return stateMachineService.activeProject;
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

    projectService.$inject = ["stateMachineService"];
})();