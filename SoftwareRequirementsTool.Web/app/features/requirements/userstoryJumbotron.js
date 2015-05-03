(function () {

    "use strict";

    function userstoryJumbotron(actorsService, notificationService, $q) {

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
                //scope.modifyMode = false;
                init(scope);
            },
            restrict: "EA"
        };

        function init(scope) {

            initCommonFunctions(scope);

            if (scope.creationMode) {
                initCreateAttributes(scope);
                initCreationFunctions(scope);


            } else {
                initModifyAttributes(scope);
                initModificationFunctions(scope);

            }

        }


        //init attributes
        function initCreateAttributes(scope) {
            scope.modifyMode = true;
            scope.creationMode = true;

            scope.entity = new Entities.BaseElement();
            scope.entity.ContainerProject = CoreServices.projectsServiceInstance.active;

            scope.entity.Actor = actorsService.getFreshActor();

            scope.validateUserStory();
            scope.validateActor();

            _initCommonAttributes(scope);
        }

        function initModifyAttributes(scope) {
            scope.creationMode = false;
            scope.modifyMode = false;
            
            if (!(scope.entity instanceof Entities.BaseElement)) {
                scope.entity = Entities.EntityFactory.createComplexFrom(scope.entity);
            }

            scope.validateUserStory();
            scope.validateActor();

            scope.copyOfEntity = null;

            _initCommonAttributes(scope);
        }

        //called by the other two
        function _initCommonAttributes(scope) {
            scope.actorName = scope.entity.Actor.Name;
            scope.actorNames = actorsService.actorNames;
            scope.disabledMsg = "The save button is disabled while the UserStory or it's Actor is not valid";
        }


        //init scope functions
        function initCreationFunctions(scope) {
            scope.save = function () {

                scope.setActorAndCreateIfNeededAsync().then(function () {

                    if (scope.validateUserStory() && scope.validateActor()) {
                        scope.creationAccepted({ entity: scope.entity });
                        initCreateAttributes();
                    } else {
                        notificationService.showWarning("the user story is invalid, it will not be saved.");
                    }
                }).catch(function(msg) {
                    console.log(msg);
                });
            }

            scope.cancel = function () {
                scope.creationCancelled({ entity: scope.entity });
                initCreateAttributes();
            }
        }

        function initModificationFunctions(scope) {

            scope.save = function () {
                scope.setActorAndCreateIfNeededAsync().then(function () {

                    if (scope.validateUserStory() && scope.validateActor()) {
                        scope.modifyCallback({ entity: scope.entity });

                        initModifyAttributes(scope);
                    }

                });
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


        function initCommonFunctions(scope) {
            scope.validateUserStory = function () {
                scope.usecaseValid = scope.entity.isValid();
                return scope.usecaseValid;
            }

            scope.validateActor = function () {
                scope.actorValid = scope.entity.Actor.isValid();
                return scope.actorValid;
            }

            scope.validateActorName = function() {
                scope.actorValid = (scope.actorName !== "");
                return scope.actorValid;
            }

            scope.setActorAndCreateIfNeededAsync = function () {
                var deferred = $q.defer();

                if (scope.entity.Actor.Name === scope.actorName) {
                    deferred.resolve();
                    return deferred.promise;
                }

                var act = actorsService.getActorForName(scope.actorName);
                if (act === null) {
                    act = new Entities.BaseElement();
                    act.Name = scope.actorName;
                    act.ContainerProject = CoreServices.projectsServiceInstance.active;
                    act.ContainerProjectId = CoreServices.projectsServiceInstance.active.Id;

                    if (!act.isValid()) {
                        scope.actorValid = false;
                        notificationService.showWarning("The actor is invalid");

                        deferred.reject();
                        return deferred.promise;
                    }

                    //creating new actor
                    scope.actorValid = false;
                    actorsService.create(act, function (createdActor) {
                        scope.entity.Actor = createdActor;
                        scope.actorValid = true;
                        AngularUtils.safeApply(scope);
                        notificationService.showInfo("We have created a new Actor: " + createdActor.Name);

                        deferred.resolve();
                    });

                } else {
                    //usage of existing Actor
                    scope.entity.Actor = act;
                    scope.validateActor();
                    deferred.resolve();
                }

                return deferred.promise;
            }
        }


        //The End of userstoryJumbotron
        return directive;
    }

    angular
        .module("app")
        .directive("userstoryJumbotron", userstoryJumbotron);

    userstoryJumbotron.$inject = ["actorsService", "notificationService", "$q"];
})();