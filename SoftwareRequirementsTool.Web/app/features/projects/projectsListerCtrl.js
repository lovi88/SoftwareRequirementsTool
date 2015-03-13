(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectsListerCtrl', projectsListerCtrl);

    projectsListerCtrl.$inject = ['$location'];

    function projectsListerCtrl($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'projectsListerCtrl';

        vm.projects = [
           { name: "pr1" },
           { name: "pr2" },
           { name: "pr3" },
           { name: "pr4" }
        ];
        

        vm.Click = function (project) {
            alert(project.name);
        };

       
        activate();
        function activate() { }

    }
})();
