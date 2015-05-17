(function () {
    "use strict";

    function stateMachineService($state, $q, $sessionStorage, notificationService) {

        var privates = {};

        CoreServices.BaseSignalRService.errorMessageService = notificationService;
        privates.projectCoreService = CoreServices.projectsServiceInstance;
        privates.diagramCoreService = CoreServices.diagramsServiceInstance;

        //states
        this.isUserAuthenticated = false;
        this.isThereActiveProject = false;
        this.isThereActiveDiagram = false;
        this.isLoading = false;

        //active elements
        this.activeUser = null;
        this.activeProject = null;
        this.activeDiagram = null;

        //key constants
        this.ACTIVE_PROJECT_KEY = "activeProject";
        this.ACTIVE_DIAGRAM_KEY = "activeDiagram";


        var that = this;
        var storage = $sessionStorage;

        //state changer functions
        //project
        function openProject(project) {

            privates.openProjectAndLoadElements(project).then(function () {
                
                that.isThereActiveProject = true;
                that.activeProject = project;

                notificationService.showInfo(project.Name + " is opened, now the requirements and the modelling menus are active");
            });

        };

        function closeProject(project) {
            that.isThereActiveProject = false;
            that.activeProject = null;

            delete storage[that.ACTIVE_PROJECT_KEY];

            if (that.activeDiagram) {
                that.closeDiagram(that.activeDiagram);
            }

            notificationService.showInfo(project.Name + " is closed, now the requirements and the modelling menus are deactivated");
        };

        function isActiveProject(element) {

            if (Utils.TypeChecker.isUndefinedOrNull(element)) {
                return false;
            }

            if (Utils.TypeChecker.isUndefinedOrNull(that.activeProject)) {
                return false;
            }

            return (element.Id === that.activeProject.Id);
        }

        //diagram
        function openDiagram(diagram) {

            privates.openDiagramAndLoadElements(diagram).then(function () {
                that.isThereActiveDiagram = true;
                that.activeDiagram = diagram;

                notificationService.showInfo(diagram.Name + "is opened, modelling page is activated");
            });

        };

        function closeDiagram(diagram) {
            that.isThereActiveDiagram = false;
            that.activeDiagram = null;

            delete storage[that.ACTIVE_DIAGRAM_KEY];

            notificationService.showInfo(diagram.Name + "is closed, modelling page is deactivated");
        };

        function isActiveDiagram(element) {

            if (Utils.TypeChecker.isUndefinedOrNull(element)) {
                return false;
            }

            if (Utils.TypeChecker.isUndefinedOrNull(that.activeDiagram)) {
                return false;
            }

            return (element.Id === that.activeDiagram.Id);
        }


        function toSignedInState(user) {
            that.isUserAuthenticated = true;
            that.activeUser = user;
        }

        function toSignedOutState() {
            that.isUserAuthenticated = false;
            that.activeUser = null;
        }

        //redirecting functions
        function redirectIfNoActiveProject() {
            
            if (that.activeProject == null) {
                //notificationService.showInfo("There is no active project, so we redirected you to the Projects page");
                $state.go("projects");
            }
        }

        function redirectIfNoActiveDiagram() {
            if (that.activeDiagram == null) {
                //notificationService.showInfo("There is no active diagram, so we redirected you to the Diagrams page");
                $state.go("diagrams");
            }
        }


        //public interface
        this.openProject = openProject;
        this.closeProject = closeProject;
        this.isActiveProject = isActiveProject;

        this.openDiagram = openDiagram;
        this.closeDiagram = closeDiagram;
        this.isActiveDiagram = isActiveDiagram;

        this.toSignInState = toSignedInState;
        this.toSignOutState = toSignedOutState;

        this.redirectIfNoActiveProject = redirectIfNoActiveProject;
        this.redirectIfNoActiveDiagram = redirectIfNoActiveDiagram;




        //private helpers
        privates.openProjectAndLoadElements = function (project) {

            var deferred = $q.defer();

            privates.projectCoreService.open(project);

            var diagPromise = CoreServices.diagramsServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
            var storyPromise = CoreServices.userStoryServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
            var actorPromise = CoreServices.actorServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);
            var useCasePromise = CoreServices.useCaseServiceInstance.loadAllForEntityToPropertyAsyncPromised(project);

            //converting to Angular Promises (in order to fire the $apply)
            diagPromise = $q.when(diagPromise);
            storyPromise = $q.when(storyPromise);
            actorPromise = $q.when(actorPromise);
            useCasePromise = $q.when(useCasePromise);

            that.isLoading = true;
            $q.all([diagPromise, storyPromise, actorPromise, useCasePromise]).then(function () {
                that.isLoading = false;   
                deferred.resolve();
            });

            privates.toStorage(that.ACTIVE_PROJECT_KEY, project);

            return deferred.promise;
        }

        privates.openDiagramAndLoadElements = function (diagram) {
            var deferred = $q.defer();

            privates.diagramCoreService.open(diagram);

            var useCaseViewJqPr = CoreServices.useCaseDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);
            var actorViewJqPr = CoreServices.actorDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);
            var connectionViewJqPr = CoreServices.connectionDiagramPartServiceInseance.loadAllForEntityToPropertyAsyncPromised(diagram);

            that.isLoading = true;
            $q.all($q.when(useCaseViewJqPr), $q.when(actorViewJqPr), $q.when(connectionViewJqPr))
                .then(function (ok) {
                    that.isLoading = false;
                    deferred.resolve();
                }, function (reason) {
                    console.log(reason);
                    deferred.reject();
                }).catch(function (err) {
                    deferred.reject();
                    console.log(err);
                });

            privates.toStorage(that.ACTIVE_DIAGRAM_KEY, diagram);

            return deferred.promise;
        }

        privates.toStorage = function (key, element) {
            storage[key] = element;
        }

        privates.retrieveElements = function () {
            var actPrj = storage[that.ACTIVE_PROJECT_KEY];
            var actDiag = storage[that.ACTIVE_DIAGRAM_KEY];

            if (!Utils.TypeChecker.isUndefinedOrNull(actPrj)) {
                that.openProject(actPrj);
            }

            if (!Utils.TypeChecker.isUndefinedOrNull(actDiag)) {
                that.openDiagram(actDiag);
            }
        }



        //inits
        privates.retrieveElements();
        this.isLoading = true;
        privates.projectCoreService.loadAllToProperty(function() {
            that.isLoading = false;
        });

    }

    angular
        .module("app")
        .service("stateMachineService", stateMachineService);

    stateMachineService.$inject = ["$state", "$q", "$sessionStorage", "notificationService"];
})();