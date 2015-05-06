(function () {
    "use strict";

    function stateMachineService($state, $sessionStorage, notificationService) {

        var that = this;

        //states
        this.isUserAuthenticated = false;
        this.isThereActiveProject = false;
        this.isThereActiveDiagram = false;

        //active elements
        this.activeUser = null;
        this.activeProject = null;
        this.activeDiagram = null;

        //key constants
        this.ACTIVE_PROJECT_KEY = "activeProject";
        this.ACTIVE_DIAGRAM_KEY = "activeDiagram";


        //state changer functions
        function openProject(project) {
            that.isThereActiveProject = true;
            that.activeProject = project;

            notificationService.showInfo(project.Name + " is opened, now the requirements and the modelling menues are active");
        };

        function closeProject(project) {
            that.isThereActiveProject = false;
            that.activeProject = null;

            notificationService.showInfo(project.Name + " is closed, now the requirements and the modelling menues are deactivated");
        };

        function openDiagram(diagram) {
            that.isThereActiveDiagram = true;
            that.activeDiagram = diagram;

            notificationService.showInfo(diagram.Name + "is opened, modelling page is activated");
        };

        function closeDiagram(diagram) {
            that.isThereActiveDiagram = false;
            that.activeDiagram = null;

            notificationService.showInfo(diagram.Name + "is closed, modelling page is deactivated");
        };

        function toSignInState(user) {
            that.isUserAuthenticated = true;
            that.activeUser = user;
        }

        function toSignOutState() {
            that.isUserAuthenticated = false;
            that.activeUser = null;
        }

        //redirecting functions
        function redirectIfNoActiveProject() {
            if (that.activeProject == null) {
                notificationService.showInfo("There is no active project, so we redirected you to the Projects page");
                $state.go("projects");
            }
        }

        function redirectIfNoActiveDiagram() {
            if (that.activeProject == null) {
                notificationService.showInfo("There is no active diagram, so we redirected you to the Diagrams page");
                $state.go("diagrams");
            }
        }

        
        //state retrival from $storage
        var storage = $sessionStorage;
        var actProjectFromStorage = storage[this.ACTIVE_PROJECT_KEY];
        var actDiagramFromStorage = storage[this.ACTIVE_DIAGRAM_KEY];

        if (!(Utils.TypeChecker.isUndefinedOrNull(actProjectFromStorage))) {
            this.activeProject = actProjectFromStorage;
        }

        if (!(Utils.TypeChecker.isUndefinedOrNull(actDiagramFromStorage))) {
            this.activeDiagram = actDiagramFromStorage;
        }

        //public interface
        this.openProject = openProject;
        this.closeProject = closeProject;
        this.openDiagram = openDiagram;
        this.closeDiagram = closeDiagram;
        this.toSignInState = toSignInState;
        this.toSignOutState = toSignOutState;

        this.redirectIfNoActiveProject = redirectIfNoActiveProject;
        this.redirectIfNoActiveDiagram = redirectIfNoActiveDiagram;
    }

    angular
        .module("app")
        .service("stateMachineService", stateMachineService);

    stateMachineService.$inject = ["$state", "$sessionStorage", "notificationService"];
})();