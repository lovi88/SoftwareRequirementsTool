(function () {

    "use strict";

    function userstoryJumbotron(actorsService, notificationService) {

        // Usage:
        //     <userstory-jumbotron></userstory-jumbotron>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/features/requirements/userstory-jumbotron.html",
            replace: true,
            scope: {
                entity: "=entity",
                modifyCallback: "&modify",
                deleteCallback: "&delete",
                creationMode: "@?creationMode",
                creationAccepted: "&create",
                creationCancelled: "&cancel"
            },
            link: function (scope, element, attrs) {
                scope.modifyMode = false;
                init(scope);
            },
            restrict: "EA"
        };

        function init(scope) {

            if (scope.creationMode) {
                creationModeInit(scope);
            } else {

                modifyModeInit(scope);
            }

            commonInit(scope);
        }

        function modifyModeInit(scope) {

            console.log(scope.entity)

            scope.copyOfEntity = null;
            scope.save = function () {
                scope.modifyCallback({ entity: scope.entity });
                scope.modifyMode = false;
            }

            scope.delete = function () {

                scope.deleteCallback({ entity: scope.entity });
            }

            scope.allowModiy = function () {
                scope.modifyMode = true;
                scope.copyOfEntity = angular.copy(scope.entity);
            }

            scope.cancel = function () {

                scope.modifyMode = false;
                scope.entity = copyOfEntity;
            }
        }

        function creationModeInit(scope) {
            scope.modifyMode = true;
            scope.creationMode = true;
            scope.entity = new Entities.BaseElement();
            scope.entity.Actor = new Entities.BaseElement();

            scope.entity.ContainerProject = CoreServices.projectsServiceInstance.active;
            scope.entity.Actor.ContainerProject = CoreServices.projectsServiceInstance.active;

            scope.save = function () {
                scope.creationAccepted({ entity: scope.entity });
                init(scope);
            }

            scope.cancel = function () {
                scope.creationCancelled({ entity: scope.entity });
                init(scope);
            }
        }

        function commonInit(scope) {
            if (Utils.TypeChecker.isUndefinedOrNull(scope.entity.Actor)) {
                scope.entity.Actor = new Entities.BaseEntity();
            }
            scope.actorName = scope.entity.Actor.Name;
            scope.actorNames = actorsService.actorNames;

            scope.actorValid = false;
            scope.usecaseValid = false;
            scope.disabledMsg = "The save button is disabled while the UserStory or it's Actor is not valid";

            scope.validateActorAndCreateIfNeeded = function (actorName) {

                var act = actorsService.getActorForName(actorName);
                if (act === null) {
                    act = new Entities.BaseElement();
                    act.Name = scope.actorName;
                    act.ContainerProject = CoreServices.projectsServiceInstance.active;
                    act.ContainerProjectId = CoreServices.projectsServiceInstance.active.Id;

                    if (!act.isValid()) {
                        scope.actorValid = false;
                        return;
                    }

                    //creating new actor
                    scope.actorValid = false;
                    actorsService.create(act, function (createdActor) {
                        scope.entity.Actor = createdActor;
                        scope.actorValid = true;
                        AngularUtils.safeApply(scope);
                        notificationService.showInfo("We have created a new Actor: "+createdActor.Name);
                    });

                } else {
                    //usage of existing Actor
                    scope.actorValid = true;
                    scope.entity.Actor = act;
                }
            }

            scope.validateUserStory = function () {
                scope.usecaseValid = scope.entity.isValid();
            }
        }
        
        //The End of userstoryJumbotron
        return directive;
    }

    angular
        .module("app")
        .directive("userstoryJumbotron", userstoryJumbotron);

    userstoryJumbotron.$inject = ["actorsService", "notificationService"];
})();