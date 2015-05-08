(function () {
    "use strict";

    function usecaseService($q, dialogs) {
        var that = this;

        var service = CoreServices.useCaseServiceInstance;
        var baseService = new ServiceParts.BaseCrudService(service);

        function getFreshUseCase(name) {

            var usecase = new Entities.BaseElement();

            if (!(Utils.TypeChecker.isUndefined(CoreServices.projectsServiceInstance.active))) {
                usecase.ContainerProject = CoreServices.projectsServiceInstance.active;
                usecase.ContainerProjectId = CoreServices.projectsServiceInstance.active.Id;
            }

            if (!(Utils.TypeChecker.isUndefinedOrNull(name))) {
                usecase.Name = name;
            }

            return usecase;
        }
        

        //Public Interface
        this.usecases = service.usecases;
        
        this.create = function (act, callback) {
            baseService.create(act, callback);
        }

        this.createDeferred = function (usecase) {

            var deferred = $q.defer();

            baseService.create(usecase, function (created) {
                deferred.resolve(created);
            });

            return deferred.promise;
        }

        this.createWithModal = function () {
            var deferred = $q.defer();

            var usecase = that.getFreshUseCase();

            var modalInstance = dialogs.createCustomDialog(
                "Create UseCase",
                usecase
            );

            modalInstance.result.then(function (usecaseToSave) {
                return that.createDeferred(usecaseToSave);
            }).then(function (createdUseCase) {
                deferred.resolve(createdUseCase);
            }).catch(function (err) {
                console.log(err);
            });

            return deferred.promise;
        }

        this.modify = baseService.modify;
        this.deleteEntity = baseService.deleteEntity;
        this.getFreshUseCase = getFreshUseCase;
    }

    angular
        .module("app")
        .service("usecaseService", usecaseService);

    usecaseService.$inject = ["$q", "dialogs"];
})();