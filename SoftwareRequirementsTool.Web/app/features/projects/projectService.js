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

            //TODO: CoreServices.diagramServiceInstance.loadByProject(project)
            //TODO: CoreServices.requirementsServiceInstance.loadByProject(project)
        }

        function close(project) {
            console.log("service.close")
            activeProject = null;
        }

        function create(project) {

        }

        function modify(project) {
            console.log("modify")
            console.log(project)
        }

        this.isActive = isActive;
        this.open = open;
        this.close = close;
        this.modify = modify;

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