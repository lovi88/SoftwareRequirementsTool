(function () {
    "use strict";

    function projectController($scope, projectService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "projectController Tit";

        function activate() {

        }
        activate();
    }

    angular
        .module("app")
        .controller("projectController", projectController);

    projectController.$inject = ["$scope", "projectService"];
})();
