(function () {
    "use strict";

    function entityJumbotron() {
        // Usage:
        //     <entity-jumbotron></entity-jumbotron>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/widgets/entity-jumbotron.html",
            replace: true,
            scope: {
                entity: "=entity",
                isActiveCallback: "&isActive",
                openCallback: "&open",
                closeCallback: "&close",
                modifyCallback: "&modify",
                deleteCallback: "&delete"

            },
            link: function(scope, element, attrs) {
                scope.open = function() {
                    scope.openCallback({entity:scope.entity});
                }

                scope.close = function () {
                    scope.closeCallback({ entity: scope.entity });
                }

                scope.modify = function () {
                    scope.modifyCallback({ entity: scope.entity });
                }

                scope.delete = function () {
                    scope.deleteCallback({ entity: scope.entity });
                }

                scope.isActive = function () {
                   return scope.isActiveCallback({ entity: scope.entity });
                }

            },
            restrict: "EA",
            controller: function () {

            }
        };

        return directive;
    }

    angular
        .module("app")
        .directive("entityJumbotron", entityJumbotron);

    //entityJumbotron.$inject = ["$scope"];
})();