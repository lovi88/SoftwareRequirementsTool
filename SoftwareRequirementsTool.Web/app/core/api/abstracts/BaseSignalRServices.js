var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CoreServices;
(function (CoreServices) {
    var BaseSignalRService = (function () {
        function BaseSignalRService(propertyName) {
            this.observers = new Array();
            this.callbacks = new Array();
            this.propertyName = propertyName;
        }
        BaseSignalRService.prototype.create = function (element, callback) {
            var _this = this;
            this.hub.server.create(element).done(function (result) {
                _this.created(result);
                if (Utils.TypeChecker.isFunction(callback)) {
                    callback(_this.touchedElement);
                }
            }).fail(function (reason) {
                console.log("Error: BaseSignalRService.create |", reason);
            });
        };
        BaseSignalRService.prototype.modify = function (element, callback) {
            this.hub.server.modify(element);
            this.modified(element);
        };
        BaseSignalRService.prototype.deleteEntity = function (element, callback) {
            this.hub.server.delete(element);
            this.deleted(element);
        };
        BaseSignalRService.prototype.resetFromServer = function (element) {
            this.hub.server.getById(element.id).done(function (result) {
                element.setUpFromObject(result);
            });
        };
        BaseSignalRService.prototype.getAll = function (callback) {
            this.hub.server.getAll().done(function (result) {
                if (!Utils.TypeChecker.isArray(result)) {
                    throw { message: "BaseSignalRService.getAll the result from the server vas not an Array", result: result };
                }
                var arr = Entities.EntityFactory.createArrayFrom(result);
                callback(arr);
            });
        };
        BaseSignalRService.prototype.loadAllToProperty = function (callback) {
            var _this = this;
            this.getAll(function (result) {
                for (var rKey in result) {
                    if (result.hasOwnProperty(rKey)) {
                        _this[_this.propertyName].push(result[rKey]);
                    }
                }
                if (Utils.TypeChecker.isFunction(callback)) {
                    callback();
                }
                _this.changeOccured(result);
            });
        };
        BaseSignalRService.prototype.clear = function () {
            this[this.propertyName].splice(0, this[this.propertyName].length);
        };
        //Sets the concrete hub (and the CRUD client functions) from name, for it's descendant types
        BaseSignalRService.prototype.initHub = function (hubName) {
            var _this = this;
            this.hub = $.connection[hubName];
            this.hub.client.created = function (element) { return _this.created(element); };
            this.hub.client.modified = function (element) { return _this.modified(element); };
            this.hub.client.deleted = function (element) { return _this.deleted(element); };
            this.hub.client.errorFromHub = function (error) { return _this.errorFromHub(error); };
            this.hub.client.infoFromHub = function (error) { return _this.infoFromHub(error); };
        };
        BaseSignalRService.prototype.initProperty = function () {
            this.propertyAssert(this.propertyName);
        };
        //called from server or from this.create
        BaseSignalRService.prototype.created = function (element) {
            var elm = Entities.EntityFactory.createComplexFrom(element);
            this.touchedElement = elm;
            this[this.propertyName].push(elm);
            this.creationOccured(elm);
        };
        //called from server or from this.modify
        BaseSignalRService.prototype.modified = function (element) {
            if (Utils.TypeChecker.isUndefined(element)) {
                throw "problem in the modified method (undefined element)";
            }
            var list = this[this.propertyName];
            for (var i = 0; i < list.length; i++) {
                if (this.isEqualById(list[i], element)) {
                    list[i].setUpFromObject(element);
                    break;
                }
            }
            this.modificationOccured(element);
        };
        //called from server or from this.create
        BaseSignalRService.prototype.deleted = function (element) {
            if (Utils.TypeChecker.isUndefined(element)) {
                throw "problem in the deleted method";
            }
            var list = this[this.propertyName];
            for (var i = 0; i < list.length; i++) {
                if (this.isEqualById(list[i], element)) {
                    list.splice(i, 1);
                    break;
                }
            }
            this.deletionOccured(element);
        };
        BaseSignalRService.prototype.isEqualById = function (elm1, elm2) {
            return elm1.Id === elm2.Id;
        };
        BaseSignalRService.prototype.errorFromHub = function (error) {
            alert(error.message + "\n To avoid inconsistency we need to reload the page");
            location.reload();
        };
        BaseSignalRService.prototype.infoFromHub = function (info) {
            console.log(info);
        };
        //It startes all the hubs for all services
        BaseSignalRService.startConnections = function (callback) {
            $.connection.hub.start(function () {
                if (callback instanceof Function) {
                    callback();
                }
            });
        };
        BaseSignalRService.prototype.propertyAssert = function (propName) {
            if (!this.hasOwnProperty(propName)) {
                throw "Invalid Property name";
            }
            //Future: uncomment, when TS will support that type of dynamic interface check
            //if (!(this[propName] instanceof Array<IEntity>) {
            //    throw "Invalid Property type, it must be instance of Array<IEntity>";
            //}
        };
        BaseSignalRService.prototype.creationOccured = function (element) {
            this.observers.forEach(function (item) {
                item.created(element);
            });
            this.changeOccured(element);
        };
        BaseSignalRService.prototype.modificationOccured = function (element) {
            this.observers.forEach(function (item) {
                item.modified(element);
            });
            this.changeOccured(element);
        };
        BaseSignalRService.prototype.deletionOccured = function (element) {
            this.observers.forEach(function (item) {
                item.deleted(element);
            });
            this.changeOccured(element);
        };
        BaseSignalRService.prototype.changeOccured = function (element) {
            var _this = this;
            this.callbacks.forEach(function (item) {
                item(_this, element);
            });
        };
        BaseSignalRService.prototype.registerObserver = function (observer) {
            Utils.ArrayHelpers.pushIfNotInArray(this.observers, observer);
        };
        BaseSignalRService.prototype.unregisterObserver = function (observer) {
            Utils.ArrayHelpers.deleteFromArray(this.observers, observer);
        };
        BaseSignalRService.prototype.registerChangeListenerCallback = function (callback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.callbacks, callback);
        };
        BaseSignalRService.prototype.unregisterChangeListenerCallback = function (callback) {
            Utils.ArrayHelpers.deleteFromArray(this.callbacks, callback);
        };
        return BaseSignalRService;
    })();
    CoreServices.BaseSignalRService = BaseSignalRService;
    var BaseSignalRPromisedService = (function (_super) {
        __extends(BaseSignalRPromisedService, _super);
        function BaseSignalRPromisedService(propertyName) {
            _super.call(this, propertyName);
        }
        BaseSignalRPromisedService.prototype.createAsyncPromised = function (element) {
            var deferred = $.Deferred();
            this.create(element, function (result) {
                if (result) {
                    deferred.resolve(result);
                }
                else {
                    deferred.reject();
                }
            });
            return deferred.promise();
        };
        BaseSignalRPromisedService.prototype.getAllAsyncPromised = function () {
            var deferred = $.Deferred();
            try {
                this.getAll(function (arr) {
                    deferred.resolve(arr);
                });
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise();
        };
        BaseSignalRPromisedService.prototype.loadAllToPropertyAsyncPromised = function () {
            var deferred = $.Deferred();
            try {
                this.loadAllToProperty(function (arr) {
                    deferred.resolve(arr);
                });
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise();
        };
        return BaseSignalRPromisedService;
    })(BaseSignalRService);
    CoreServices.BaseSignalRPromisedService = BaseSignalRPromisedService;
    var BaseOpenCloseService = (function (_super) {
        __extends(BaseOpenCloseService, _super);
        function BaseOpenCloseService(propertyName) {
            _super.call(this, propertyName);
            this.active = null;
        }
        BaseOpenCloseService.prototype.open = function (entity) {
            this.hub.server.open(entity);
            this.active = entity;
        };
        BaseOpenCloseService.prototype.close = function (entity) {
            this.hub.server.close(entity);
            this.active = null;
        };
        return BaseOpenCloseService;
    })(BaseSignalRPromisedService);
    CoreServices.BaseOpenCloseService = BaseOpenCloseService;
    var BaseGetAllForService = (function (_super) {
        __extends(BaseGetAllForService, _super);
        function BaseGetAllForService(propertyName) {
            _super.call(this, propertyName);
        }
        BaseGetAllForService.prototype.getAllForEntity = function (entity, callback) {
            var _this = this;
            this.hub.server.getAllFor(entity).done(function (result) {
                if (!(Utils.TypeChecker.isArray(result))) {
                    throw { message: "BaseSignalRService.getAll the result from the server was not an Array", result: result };
                }
                var arr = Entities.EntityFactory.createArrayFrom(result);
                callback(arr);
                _this.changeOccured(result);
            });
        };
        BaseGetAllForService.prototype.loadAllForEntityToProperty = function (entity, callback) {
            var _this = this;
            this.getAllForEntity(entity, function (result) {
                Utils.ArrayHelpers.clearArray(_this[_this.propertyName]);
                for (var rKey in result) {
                    if (result.hasOwnProperty(rKey)) {
                        _this[_this.propertyName].push(result[rKey]);
                    }
                }
                if (Utils.TypeChecker.isFunction(callback)) {
                    callback(result);
                }
                _this.changeOccured(result);
            });
        };
        BaseGetAllForService.prototype.getAllForEntityAsyncPromised = function (entity) {
            var deferred = $.Deferred();
            try {
                this.getAllForEntity(entity, function (arr) {
                    deferred.resolve(arr);
                });
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise();
        };
        BaseGetAllForService.prototype.loadAllForEntityToPropertyAsyncPromised = function (entity) {
            var deferred = $.Deferred();
            try {
                this.loadAllForEntityToProperty(entity, function (arr) {
                    deferred.resolve(arr);
                });
            }
            catch (e) {
                deferred.reject(e);
            }
            return deferred.promise();
        };
        return BaseGetAllForService;
    })(BaseSignalRPromisedService);
    CoreServices.BaseGetAllForService = BaseGetAllForService;
    var BaseOpenCloseGetAllForService = (function (_super) {
        __extends(BaseOpenCloseGetAllForService, _super);
        function BaseOpenCloseGetAllForService(propertyName) {
            _super.call(this, propertyName);
            this.active = null;
        }
        BaseOpenCloseGetAllForService.prototype.open = function (entity) {
            this.hub.server.open(entity);
            this.active = entity;
        };
        BaseOpenCloseGetAllForService.prototype.close = function (entity) {
            this.hub.server.close(entity);
            this.active = null;
        };
        return BaseOpenCloseGetAllForService;
    })(BaseGetAllForService);
    CoreServices.BaseOpenCloseGetAllForService = BaseOpenCloseGetAllForService;
})(CoreServices || (CoreServices = {}));
//# sourceMappingURL=BaseSignalRServices.js.map