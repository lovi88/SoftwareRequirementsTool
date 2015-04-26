(function () {
    "use strict";

    function userstoryJumbotron() {
        // Usage:
        //     <userstory-jumbotron></userstory-jumbotron>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/layout/requirements-page/userstory-jumbotron.html",
            replace: true,
            scope: {
                entity: "=entity",
                actors: "=actors",
                modifyCallback: "&modify",
                deleteCallback: "&delete",
                creationMode: "@?creationMode",
                creationAccepted: "&create",
                creationCancelled: "&cancel"
            },
            link: function (scope, element, attrs) {
                scope.modifyMode = false;

                commonInit(scope);

                if (scope.creationMode) {
                    creationModeInit(scope);
                } else {
                    modifyModeInit(scope);
                }

            },
            restrict: "EA"
        };

        function modifyModeInit(scope) {
            scope.copyOfEntity = null;
            scope.modify = function () {
                makeRole(scope);
                scope.modifyCallback({ entity: scope.entity });
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

            scope.modify = function () {
                makeRole(scope);
                scope.creationAccepted({ entity: scope.entity });
            }

            scope.cancel = function () {
                scope.creationCancelled({ entity: scope.entity });
            }
        }

        function commonInit(scope) {
            if (Utils.TypeChecker.isUndefinedOrNull(scope.entity.Role)) {
                scope.entity.Role = new Entities.BaseEntity();
            }
            scope.actorName = scope.entity.Role.Name;

        }

        function makeRole(scope) {
            if (scope.actorName === scope.entity.Role.Name) {
                return;
            }

            var us = scope.entity;
            var act = null;

            for (var i = 0; i < scope.actors.length; i++) {
                if (scope.actors[i].Name === actorName) {
                    act = scope.actors[i];
                    break;
                }
            }

            if (act===null) {
                act = new Entities.BaseEntity();
                act.Name = scope.entity.Role.Name;
            }

            us.Role = act;
        }

        return directive;
    }

    angular
        .module("app")
        .directive("userstoryJumbotron", userstoryJumbotron);

    //userstoryJumbotron.$inject = ["$scope"];
})();