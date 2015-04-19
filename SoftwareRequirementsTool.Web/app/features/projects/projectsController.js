(function () {
    "use strict";

    function projectsController($scope, dialogs, projectService) {
        /* jshint validthis:true */
        var vm = $scope;
        vm.title = "projectsController";

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
                new Project()
            );

            modalInstance.result.then(function (objectToSave) {
                //save aproved
                console.log(objectToSave);
                vm.service.create(objectToSave, function (obj) {
                    //creation occured
                    console.log("saved");
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
                console.log(objectToSave);


                vm.service.modify(objectToSave, function (obj) {
                    //modification occured
                    console.log("saved");
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
