(function () {
    "use strict";

    function userstoryJumbotron(actorsService) {
        // Usage:
        //     <userstory-jumbotron></userstory-jumbotron>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/layout/requirements-page/userstory-jumbotron.html",
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
                
                //scope.$watch("entity", function (newValue, oldValue) {
                //    init(scope);
                //});
                
                init(scope);
            },
            restrict: "EA"
        };

        function init(scope) {
            commonInit(scope);

            if (scope.creationMode) {
                creationModeInit(scope);
            } else {
                modifyModeInit(scope);
            }
        }

        function modifyModeInit(scope) {
            scope.copyOfEntity = null;
            scope.save = function () {
                makeActor(scope);
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

            scope.save = function () {
                makeActor(scope);
                scope.creationAccepted({ entity: scope.entity });
                scope.actorName = "";
            }

            scope.cancel = function () {
                scope.creationCancelled({ entity: scope.entity });
                scope.actorName = "";
            }
        }

        function commonInit(scope) {
            if (Utils.TypeChecker.isUndefinedOrNull(scope.entity.Actor)) {
                scope.entity.Actor = new Entities.BaseEntity();
            }
            scope.actorName = scope.entity.Actor.Name;
            scope.actorNames = actorsService.actorNames;
        }

        function makeActor(scope) {
            if (scope.actorName === scope.entity.Actor.Name) {
                return;
            }

            var us = scope.entity;

            var act = actorsService.getActorForName(scope.actorName);
            if (act===null) {
                act = new Entities.BaseEntity();
                act.Name = scope.actorName;
            }

            us.Actor = act;
        }

        return directive;
    }

    angular
        .module("app")
        .directive("userstoryJumbotron", userstoryJumbotron);

    userstoryJumbotron.$inject = ["actorsService"];
})();