(function () {
    "use strict";

    function userStoriesController($scope, $state, dialogs, diagramsService, projectService, menuService, userStoriesService) {
        /* jshint validthis:true */
        var vm = $scope;
        vm.title = "User Stories";

        vm.userStoriesService = userStoriesService;

        vm.userStories = new Array();
        vm.actors = ["Admin", "SupeUser"];

        var changeEventHandler = function (from, data) {
            AngularUtils.safeApply($scope);
        };

        function activate() {

            vm.service.registerChangeListenerCallback(changeEventHandler);

            if (!menuService.isRequirementsViseible) {
                // TODO: Uncomment
                //$state.go("projects");
            }

            //var us = new Entities.BaseEntity();
            //us.Name = "us1";
            //us.Description = "us1 desc";

            //us.Role = new Entities.BaseEntity();
            //us.Role.Name = "Pisi (Actor.Name)";

            //us.Activity = "Activity str";

            //us.BusinessValue = "bs value";
            //us.TypeName = "UserStory";

            //var us2 = Entities.EntityFactory.createComplexFrom(us);

            //vm.userStories.push(us);

            //us2.Name = "zongora";

            //vm.userStories.push(us2)


            //vm.actors.push("User");
        }

        vm.modify = function (entity) {
            console.log("mod", entity)
        }

        vm.delete = function (entity) {
            console.log("us ctrl del", entity)
        }

        vm.create = function() {
            
        }

        activate();
    }

    angular
        .module("app")
        .controller("userStoriesController", userStoriesController);

    userStoriesController.$inject = ["$scope", "$state", "dialogs", "diagramsService", "projectService", "menuService", "userStoriesService"];
})();
