(function () {
    "use strict";

    function nameDescDialogController($scope, $modalInstance, title, data) {
        /* jshint validthis:true */

        $scope.title = title;
        $scope.data = data;
        $scope.hasError = false;

        $scope.save = function () {

            if ($scope.data.Name) {

                console.log("n")
                $scope.hasError = false;
                $modalInstance.close($scope.data);
            } else {
                console.log("noname")
                $scope.hasError = true;
            }
        }

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        }

        function activate() {
        }
        activate();
    }

    angular
        .module("app")
        .controller("nameDescDialogController", nameDescDialogController);

    nameDescDialogController.$inject = ["$scope", "$modalInstance", "title", "data"];
})();
