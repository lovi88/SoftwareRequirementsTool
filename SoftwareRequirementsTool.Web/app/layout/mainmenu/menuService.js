(function () {
    "use strict";

    function menuService() {
        var that = this;

        this.isUserAuthenticated = false;

        this.isRequirementsViseible = false;
        this.isDiagramsVisible = false;
        this.isModellingVisible = false;

        this.closeProject = function () {
            that.isRequirementsViseible = false;
            that.isDiagramsVisible = false;
        };

        this.openProject = function () {
            that.isRequirementsViseible = true;
            that.isDiagramsVisible = true;
        };

        this.closeDiagram = function () {
            that.isModellingVisible = false;
        };

        this.openDiagram = function () {
            that.isModellingVisible = true;
        };

    }

    angular
        .module("app")
        .service("menuService", menuService);

    //menuService.$inject = ["$scope"];
})();