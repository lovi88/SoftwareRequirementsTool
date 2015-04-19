(function () {
    "use strict";

    function projectService() {
        var service = CoreServices.projectsServiceInstance;
        var activeProject = null;


        function isActive(project) {
            //console.log("projectService.isActive", project)

            if (Utils.TypeChecker.isUndefined(project)) {
                return false;
            }

            return (project === activeProject);
        }

        function open(project) {
            paramneterAsserations(project);
            //console.log("projectService.open",project)

            activeProject = project;
            //TODO: CoreServices.projectsServiceInstance.open(project)
            //TODO: CoreServices.diagramServiceInstance.loadByProject(project)
            //TODO: CoreServices.requirementsServiceInstance.loadByProject(project)
        }

        function close(project) {
            //TODO: CoreServices.projectsServiceInstance.close(project)
            
            activeProject = null;
        }

        function create(project) {
            service.create(project);
        }

        function modify(project) {
            service.modify(project);
        }

        function deleteEntity(project) {
            service.deleteEntity(project)
        }

        this.isActive = isActive;
        this.open = open;
        this.close = close;
        this.modify = modify;
        this.delete = deleteEntity;
        this.create = create;
        
        //privates
        function paramneterAsserations(parameter) {
            //if (Utils.TypeChecker.isUndefined(parameter)) {
            //    //undefined
            //    throw {
            //        message: "The active project must be a Project",
            //        parameter: parameter,
            //        thrownIn: "projectService"
            //    }
            //}

            //if (!(parameter instanceof Project)) {
            //    throw {
            //        message: "The active project must be a Project",
            //        parameter: parameter,
            //        thrownIn: "projectService -> active(project)"
            //    }
            //}
        }

    }

    angular
        .module("app")
        .service("projectService", projectService);

    //projectService.$inject = [""];
})();