(function () {
    "use strict";

    function projectsController($scope, dialogs, projectService) {
        /* jshint validthis:true */

        var vm = $scope;
        vm.title = "Projects";

        vm.service = CoreServices.projectsServiceInstance;
        vm.projects = vm.service.projects;

        vm.projectsService = projectService;

        var changeEventHandler = function (from, data) {
            AngularUtils.safeApply($scope);
        };

        function activated() {
            vm.service.registerChangeListenerCallback(changeEventHandler);
        }
        activated();

        vm.create = function () {
            var modalInstance = dialogs.createCustomDialog(
                "Create Project",
                new Entities.Project()
            );

            modalInstance.result.then(function (objectToSave) {
                //save aproved
                projectService.create(objectToSave, function (obj) {
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
                projectService.modify(objectToSave, function (obj) {
                    //modification occured
                });
                
            }, function () {
                //cancel
            });

        }

    }

    angular
        .module("app")
        .controller("projectsController", projectsController);

    projectsController.$inject = ["$scope", "dialogs", "projectService"];

})();
