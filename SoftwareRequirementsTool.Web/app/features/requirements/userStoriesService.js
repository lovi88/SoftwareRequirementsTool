(function () {
    'use strict';

    angular
        .module('app')
        .service('userStoriesService', userStoriesService);

    userStoriesService.$inject = ['$http'];

    function userStoriesService($http) {
        this.getData = getData;

        function getData() { }
    }
})();