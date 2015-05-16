var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ServiceParts;
(function (ServiceParts) {
    var BaseCrudService = (function () {
        function BaseCrudService(serviceInstance) {
            this.serviceInstance = serviceInstance;
        }
        BaseCrudService.prototype.create = function (element, callback) {
            this.serviceInstance.create(element, callback);
        };
        BaseCrudService.prototype.modify = function (element) {
            this.serviceInstance.modify(element);
        };
        BaseCrudService.prototype.deleteEntity = function (element) {
            this.serviceInstance.deleteEntity(element);
        };
        return BaseCrudService;
    })();
    ServiceParts.BaseCrudService = BaseCrudService;
    var BaseCrudOpenCloseService = (function (_super) {
        __extends(BaseCrudOpenCloseService, _super);
        function BaseCrudOpenCloseService(serviceInstance, storage, storageKey, openCallBack, closeCallBack) {
            _super.call(this, serviceInstance);
            this.storage = storage;
            this.storageKey = storageKey;
            this.openCallBack = openCallBack;
            this.closeCallBack = closeCallBack;
            this.openedElement = null;
            var elmInStorage = this.storage[this.storageKey];
            if (!(Utils.TypeChecker.isUndefined(elmInStorage))) {
                this.open(elmInStorage);
            }
        }
        BaseCrudOpenCloseService.prototype.close = function (element) {
            this.serviceInstance.close(element);
            this.openedElement = null;
            delete localStorage[this.storageKey];
            if (Utils.TypeChecker.isFunction(this.closeCallBack)) {
                this.closeCallBack(element);
            }
        };
        BaseCrudOpenCloseService.prototype.open = function (element) {
            if (this.openedElement !== null) {
                this.close(this.openedElement);
            }
            this.serviceInstance.open(element);
            this.openedElement = element;
            this.storage[this.storageKey] = element;
            if (Utils.TypeChecker.isFunction(this.openCallBack)) {
                this.openCallBack(element);
            }
        };
        BaseCrudOpenCloseService.prototype.deleteEntity = function (element) {
            if (this.isActive(element)) {
                this.close(element);
            }
            _super.prototype.deleteEntity.call(this, element);
        };
        BaseCrudOpenCloseService.prototype.isActive = function (element) {
            if (Utils.TypeChecker.isUndefinedOrNull(element)) {
                return false;
            }
            if (Utils.TypeChecker.isUndefinedOrNull(this.openedElement)) {
                return false;
            }
            return (element.Id === this.openedElement.Id);
        };
        BaseCrudOpenCloseService.prototype.getActive = function () {
            return this.openedElement;
        };
        return BaseCrudOpenCloseService;
    })(BaseCrudService);
    ServiceParts.BaseCrudOpenCloseService = BaseCrudOpenCloseService;
})(ServiceParts || (ServiceParts = {}));
//# sourceMappingURL=baseCRUDServices.js.map