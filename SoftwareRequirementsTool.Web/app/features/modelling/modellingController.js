(function () {
    "use strict";

    function modellingController($scope, dialogs, diagramPartService, actorsService,
        diagramsService, projectService, stateMachineService, notificationService) {

        var vm = $scope;
        var privates = {};

        vm.title = "modellingController";
        vm.diagramPartService = diagramPartService;

        //parts
        vm.actorParts = diagramPartService.actorParts;
        vm.usecaseParts = diagramPartService.usecaseParts;
        vm.connectionParts = diagramPartService.connectionParts;

        //actor functions
        vm.actors = actorsService.actors;

        vm.createActor = function () {
            actorsService.createWithModal().then(function(createdActor) {
                privates.addActorToDiagram(createdActor);
            });
        }

        vm.selectedActor = null;
        vm.useActor = function () {

            if (Utils.TypeChecker.isUndefinedOrNull(vm.selectedActor)) {
                notificationService.showWarning("You have to choose an actor in order to use it.");
                return;
            }

            privates.addToDiagram(vm.selectedActor);
        }

        function activate() {
            stateMachineService.redirectIfNoActiveProject();
            stateMachineService.redirectIfNoActiveDiagram();
        }
        activate();

        privates.addActorToDiagram = function (element) {
            console.log(element);

            diagramPartService.createFreshActorPart(element).then(function(par) {
                console.log("part",par)
                console.log("core svc", vm.diagramPartService)

            });
            //TODO: Megjelenítés (a .html-nél foreach, ami az actort tartalmazókra filterez)
        }

    }

    angular
        .module("app")
        .controller("modellingController", modellingController);

    modellingController.$inject = ["$scope", "dialogs", "diagramPartService", "actorsService", "diagramsService", "projectService", "stateMachineService", "notificationService"];

})();
