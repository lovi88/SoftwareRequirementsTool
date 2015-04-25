(function () {
    "use strict";

    function nameDescDialogController($scope, $modalInstance, title, data) {
        /* jshint validthis:true */

        $scope.title = title;
        $scope.data = data;

        $scope.save = function () {
            if ($scope.data.Name) {
                $modalInstance.close($scope.data);
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
