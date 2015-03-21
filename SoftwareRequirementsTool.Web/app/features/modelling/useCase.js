﻿(function () {
    'use strict';

    angular
        .module('app')
        .directive('useCase', useCase);

    useCase.$inject = ['$window','$compile'];

    function useCase($window, $compile) {
        // Usage:
        //     <use-case></use-case>
        // Creates: A UseCase diagram element
        // 

        var directive = {
            restrict: 'EA',
            templateUrl: "/app/features/modelling/useCase.svg",
            templateNamespace: 'svg',
            link: link,
            replace: true,
            
            scope: {
                usecaseview:"=usecaseview"
            }
            
        };

        return directive;


        function link(scope, element, attrs) {
            //element.on("click", function() {
            //    alert("clicked")
            //});

            angular.element(element).on("click", function() {
                alert("sa")
            })

            
        }


    }

})();