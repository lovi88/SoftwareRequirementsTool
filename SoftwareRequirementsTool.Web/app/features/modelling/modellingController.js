(function () {
    "use strict";

    function modellingController($scope, diagramPartService, actorsService, usecaseService,
        diagramsService, projectService, stateMachineService, notificationService) {

        function activate() {
            stateMachineService.redirectIfNoActiveProject();
            stateMachineService.redirectIfNoActiveDiagram();

            CoreServices.useCaseDiagramPartServiceInseance
                .registerChangeListenerCallback(function (from, data) {
                    $scope.$evalAsync();
                });

            CoreServices.actorDiagramPartServiceInseance
                .registerChangeListenerCallback(function (from, data) {
                    $scope.$evalAsync();
                });
        }
        activate();

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
        vm.selectedActor = null;

        vm.createActor = function () {
            actorsService.createWithModal().then(function (createdActor) {
                privates.addActorToDiagram(createdActor);
            });
        }

        vm.useActor = function () {

            if (Utils.TypeChecker.isUndefinedOrNull(vm.selectedActor)) {
                notificationService.showWarning("You have to choose an actor in order to use it.");
                return;
            }

            privates.addActorToDiagram(vm.selectedActor);
        }

        privates.addActorToDiagram = function (element) {
            console.log(element);

            diagramPartService.createFreshActorPart(element).then(function (par) {
                //part created
            });
        }

        //usecase functions
        vm.usecases = usecaseService.usecases;
        vm.selectedUseCase = null;

        vm.createUseCase = function () {
            usecaseService.createWithModal().then(function (createdUseCase) {
                privates.addUseCaseToDiagram(createdUseCase);
            });
        }

        vm.selectedUseCase = null;
        vm.useUseCase = function () {

            if (Utils.TypeChecker.isUndefinedOrNull(vm.selectedUseCase)) {
                notificationService.showWarning("You have to choose a use case in order to use it.");
                return;
            }

            privates.addUseCaseToDiagram(vm.selectedUseCase);
        }

        privates.addUseCaseToDiagram = function (element) {
            console.log(element);

            diagramPartService.createFreshUseCasePart(element).then(function (par) {
                //part created
            });
        }


    }

    angular
        .module("app")
        .controller("modellingController", modellingController);

    modellingController.$inject = ["$scope", "diagramPartService", "actorsService", "usecaseService", "diagramsService", "projectService", "stateMachineService", "notificationService"];

})();
