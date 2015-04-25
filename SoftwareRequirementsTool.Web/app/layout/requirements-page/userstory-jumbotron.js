(function () {
    "use strict";

    function userstoryJumbotron() {
        // Usage:
        //     <userstory-jumbotron></userstory-jumbotron>
        // Creates:
        // 
        var directive = {
            templateUrl: "/app/widgets/userstory-jumbotron.html",
            replace: true,
            scope: {
                entity: "=entity",
                modifyCallback: "&modify",
                deleteCallback: "&delete"
            },
            link: function (scope, element, attrs) {

                scope.modifyMode = false;
                var copyOfEntity = null;

                scope.modify = function () {
                    scope.modifyCallback({ entity: scope.entity });
                }

                scope.delete = function () {
                    scope.deleteCallback({ entity: scope.entity });
                }

                scope.allowModiy = function () {
                    scope.modifyMode = true;
                    copyOfEntity = angular.clone(scope.entity);
                }

                scope.cancel = function () {
                    scope.modifyMode = false;
                    scope.entity = copyOfEntity;
                    //scope.$apply()
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
        .directive("userstoryJumbotron", userstoryJumbotron);

    //userstoryJumbotron.$inject = ["$scope"];
})();