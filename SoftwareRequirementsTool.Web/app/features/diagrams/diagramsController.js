(function () {
    "use strict";

    function diagramsController($scope, $state, dialogs, diagramsService, projectService, menuService) {
        /* jshint validthis:true */

        var vm = $scope;

        vm.title = "Diagrams";

        vm.service = CoreServices.diagramsServiceInstance;
        vm.diagrams = vm.service.diagrams;

        vm.diagramsService = diagramsService;

        var changeEventHandler = function (from, data) {
            AngularUtils.safeApply($scope);
        };

        function activated() {
            vm.service.registerChangeListenerCallback(changeEventHandler);

            if (!menuService.isDiagramsVisible) {
                $state.go("projects");
            }
        }
        activated();

        vm.create = function () {
            var diag = new Entities.Diagram();
            diag.ContainerProject = projectService.getActive();

            var modalInstance = dialogs.createCustomDialog(
                "Create Diagram",
                diag
            );

            modalInstance.result.then(function (objectToSave) {
                //save aproved
                diagramsService.create(objectToSave, function (obj) {
                    //creation occured
                });

            }, function () {
                //cancel
            });

        }

        vm.modify = function (project) {
            var modalInstance = dialogs.createCustomDialog(
                "Modify Project",
                project
             );

            modalInstance.result.then(function (objectToSave) {
                //save aproved
                diagramsService.modify(objectToSave, function (obj) {
                    //modification occured
                });

            }, function () {
                //cancel
            });

        }

    }

    angular
        .module("app")
        .controller("diagramsController", diagramsController);

    diagramsController.$inject = ["$scope", "$state", "dialogs", "diagramsService", "projectService", "menuService"];
})();
