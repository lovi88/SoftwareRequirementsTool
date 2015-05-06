(function () {
    "use strict";

    function modellingController($scope, dialogs, actorsService, diagramsService, projectService, stateMachineService, notificationService) {
        /* jshint validthis:true */
        var vm = $scope;
        var privates = {};

        vm.title = "modellingController";

        vm.coreService = CoreServices.diagramPartServiceInstance;

        vm.actors = actorsService.actors;

        vm.createActor = function () {
            var act = actorsService.getFreshActor();

            var modalInstance = dialogs.createCustomDialog(
                "Create Diagram",
                act
            );

            modalInstance.result.then(function (actorToSave) {
                return actorsService.createDeferred(actorToSave);
            }).then(function(createdActor) {
                privates.addToDiagram(createdActor);
            }).catch(function(err) {
                console.log(err);
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

        privates.addToDiagram = function(element) {
            console.log(element)
        }

    }

    angular
        .module("app")
        .controller("modellingController", modellingController);

    modellingController.$inject = ["$scope", "dialogs", "actorsService", "diagramsService", "projectService", "stateMachineService", "notificationService"];

})();
