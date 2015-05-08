(function () {
    "use strict";

    function stateController($scope, stateMachineService) {
        $scope.title = "stateController";
        $scope.stateMachine = stateMachineService;

        function activate() { }
        activate();
    }

    angular
        .module("app")
        .controller("stateController", stateController);

    stateController.$inject = ["$scope", "stateMachineService"];
})();
