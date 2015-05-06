(function () {
    "use strict";

    function userStoriesController($scope, stateMachineService, userStoriesService) {
        /* jshint validthis:true */
        var vm = $scope;
        vm.title = "User Stories";

        vm.inCreation = false;
        vm.userstoryToCreate = null;

        vm.service = CoreServices.userStoryServiceInstance;
        vm.userStories = vm.service.userStories;

        vm.userStoriesService = userStoriesService;

        var changeEventHandler = function (from, data) {
            AngularUtils.safeApply($scope);
        };

        function activate() {

            stateMachineService.redirectIfNoActiveProject();
            
            vm.service.registerChangeListenerCallback(changeEventHandler);
        }

        vm.modify = function (entity) {
            vm.service.modify(entity);
        }

        vm.delete = function (entity) {
            vm.service.deleteEntity(entity);
        }

        vm.create = function () {
            vm.inCreation = true;
        }

        vm.creationAccepted = function (entity) {
            vm.service.create(entity);
            vm.inCreation = false;
        }

        vm.creationCancelled = function (entity) {
            vm.inCreation = false;
        }

        activate();
    }

    angular
        .module("app")
        .controller("userStoriesController", userStoriesController);

    userStoriesController.$inject = ["$scope", "stateMachineService", "userStoriesService"];
})();
