﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('testCtrl', testCtrl);

    testCtrl.$inject = ['$scope'];

    function testCtrl($scope) {
        /* jshint validthis:true */

        $scope.title = 'testCtrl';


        var usv = new Modelling.UseCase();
        usv.data.name = "US01";

        $scope.usecaseview = usv;


        var alma = new Modelling.UseCase();
        alma.data.name = "US02 alma";
        alma.view.coordinates.x += 500;
        alma.view.recalculateCenter();

        $scope.alma = alma;

        

        activate();

        function activate() { }
    }
})();
