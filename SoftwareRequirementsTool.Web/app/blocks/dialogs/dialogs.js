(function () {
    "use strict";

    function dialogs($modal) {
        /*
         * returns: the modal instance
         */
        function createCustomDialog(dialogTitle, dataToPass, templateUrl, dialogController) {
            if (Utils.TypeChecker.isUndefined(templateUrl)) {
                templateUrl = "/app/blocks/dialogs/name-desc-dialog.html";
            }

            if (Utils.TypeChecker.isUndefined(dialogController)) {
                dialogController = "nameDescDialogController";
            }

            var mOptions = {
                templateUrl: templateUrl,
                controller: dialogController,
                resolve: {
                    data: function () {
                        //the object is copied so there is no need for rollback, if cancel
                        //but it has to be returned in success
                        return angular.copy(dataToPass);
                    },
                    title: function () {
                        return angular.copy(dialogTitle);
                    }
                }
            };

            return $modal.open(mOptions);
        }

        /*
         * Public interface of the dialogs service
         */
        var service = {
            createCustomDialog: createCustomDialog
            //add other functions if needed
        };

        return service;
    }

    angular
        .module("app")
        .factory("dialogs", dialogs);

    dialogs.$inject = ["$modal"];
})();