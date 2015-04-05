(function () {
    'use strict';

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

        var hub = $.connection.softwareRequirementsToolHub;

        

        //hub.client.logMsg = function(name, msg) {
        //    console.log(name);
        //    console.log(msg);
        //}

        //$.connection.hub.start().done(function() {
        //    hub.server.send("alma","korte");
        //});

        function activate() { }
        activate();
    }

    testCtrl.$inject = ['$scope'];

    angular
        .module('app')
        .controller('testCtrl', testCtrl);

})();
