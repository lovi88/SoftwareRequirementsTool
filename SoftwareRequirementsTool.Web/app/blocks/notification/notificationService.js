(function () {
    "use strict";

    //uses: Bootstrap Notify
    function notificationService($http) {
        $.notifyDefaults({
            delay: 3000,
            mouse_over: "pause",
            animate: {
                enter: "animated fadeInDown",
                exit: "animated fadeOutUp"
            }
        });

        var infoOptions = {
            icon: "glyphicon glyphicon-info-sign"
        };
        var infoSettings = {};
        function showInfo(message) {
            infoOptions.message = message;
            $.notify(infoOptions, infoSettings);
        }

        var warningOptions = {
            icon: "glyphicon glyphicon-warning-sign"
        };
        var warningSettings = { type: "warning" };
        function showWarning(message) {
            warningOptions.message = message;
            $.notify(warningOptions, warningSettings);
        }

        var errorOptions = {
            icon: "glyphicon glyphicon-exclamation-sign"
        };
        var errorSettings = { type: "danger" };
        function showError(message) {
            errorOptions.message = message;
            $.notify(errorOptions, errorSettings);
        }

        var successOptions = {
            icon: "glyphicon glyphicon-thumbs-up"
        };
        var successSettings = { type: "danger" };
        function showSuccess(message) {
            successOptions.message = message;
            $.notify(successOptions, successSettings);
        }

        this.showInfo = showInfo;
        this.showWarning = showWarning;
        this.showError = showError;
        this.showSuccess = showSuccess;
        
    }

    angular
        .module("app")
        .service("notificationService", notificationService);

    //notificationService.$inject = ["$http"];
})();