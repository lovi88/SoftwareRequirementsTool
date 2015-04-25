(function () {
    'use strict';

    angular
        .module('app')
        .controller('userStoriesController', userStoriesController);

    userStoriesController.$inject = ['$location']; 

    function userStoriesController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'userStoriesController';

        activate();

        function activate() { }
    }
})();
