(function () {
    "use strict";

    function userStoriesController($scope, $state, dialogs, diagramsService, projectService, menuService, userStoriesService) {
        /* jshint validthis:true */
        var vm = $scope;
        vm.title = "User Stories";

        vm.inCreation = false;
        vm.userstoryToCreate = null;

        vm.service = CoreServices.userStoryServiceInstance;
        vm.userStories = vm.service.userStories;

        vm.userStoriesService = userStoriesService;

        //TODO: Normális Actor Kezelés
        vm.actors = [];
        vm.actorNames = [];

        var changeEventHandler = function (from, data) {
            AngularUtils.safeApply($scope);
        };

        function activate() {

            if (!menuService.isRequirementsViseible) {
                // TODO: Uncomment
                //$state.go("projects");
            }

            //test: tkód
            var tAct01 = new Entities.BaseEntity();
            tAct01.Name = "Pisti";

            var tAct02 = new Entities.BaseEntity();
            tAct02.Name = "Pisti2";

            var tAct03 = new Entities.BaseEntity();
            tAct03.Name = "Pisti3";



            vm.actors.push(tAct01);
            vm.actors.push(tAct02);
            vm.actors.push(tAct03);


            //code
            //TODO: add names to jumbo
            //TODO: make crud work
            //TODO: actor service? commonService, hub

            vm.service.registerChangeListenerCallback(changeEventHandler);

            vm.actorNames = new Array();
            for (var i = 0; i < vm.actors.length; i++) {
                vm.actorNames.push(vm.actors[i].Name);
            }
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
            initCreateUserStory();
        }

        vm.creationCancelled = function (entity) {
            vm.inCreation = false;
            initCreateUserStory();
        }

        function initCreateUserStory() {
            var ent = new Entities.BaseEntity();
            ent.ContainerProject = projectService.getActive();
            vm.userstoryToCreate = ent;
        }
        
        activate();
        initCreateUserStory();
    }

    angular
        .module("app")
        .controller("userStoriesController", userStoriesController);

    userStoriesController.$inject = ["$scope", "$state", "dialogs", "diagramsService", "projectService", "menuService", "userStoriesService"];
})();
