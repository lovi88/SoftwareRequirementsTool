(function () {
    'use strict';

    function projectsListerCtrl($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "projectsListerCtrl";

        vm.projects = [
            {
                name: "pr1",
                description: "leírás",
                id:10
            },
            {
                name: "pr2",
                description: "leírás",
                id: 11
            },
            {
                name: "pr3",
                description: "leírás",
                id: 12
            },
            {
                name: "pr4",
                description: "leírás",
                id: 13
            },
            {
                name: "pr5",
                description: "leírás",
                id: 14
            }
        ];
        

        vm.Click = function (project) {
            alert(project.name);
        };

        function activate() { }

        activate();
    }

    angular
        .module("app")
        .controller("projectsListerCtrl", projectsListerCtrl);

    projectsListerCtrl.$inject = ["$location"];
})();
