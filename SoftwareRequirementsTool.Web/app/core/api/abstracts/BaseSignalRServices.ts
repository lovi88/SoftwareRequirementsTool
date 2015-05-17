module CoreServices {
    export class BaseSignalRService implements ICrudObservableSubject {
        protected hub: any;
        protected propertyName: string;

        protected observers = new Array<ICrudObserver>();
        protected callbacks = new Array<IEventCallback>();

        //this is for use to communicate between create/created; modify/modified
        protected touchedElement: any;

        constructor(propertyName) {
            this.propertyName = propertyName;
        }

        create(element, callback?) {
            this.hub.server.create(element).done((result) => {
                this.created(result);

                if (Utils.TypeChecker.isFunction(callback)) {
                    callback(this.touchedElement);
                }
            }).fail(reason => {
                console.log("Error: BaseSignalRService.create |", reason);
            });
        }

        modify(element, callback?) {
            this.hub.server.modify(element);
            this.modified(element);
        }

        refresh(element, callback?) {
            this.hub.server.refresh(element);
            this.modified(element);
        }

        deleteEntity(element, callback?) {
            this.hub.server.delete(element);
            this.deleted(element);
        }

        resetFromServer(element) {
            this.hub.server.getById(element.id).done((result) => {
                element.setUpFromObject(result);
            });
        }

        getAll(callback: IArrayWaitCallback) {
            this.hub.server.getAll().done(result => {
                if (!Utils.TypeChecker.isArray(result)) {
                    throw { message: "BaseSignalRService.getAll the result from the server vas not an Array", result: result };
                }

                var arr = Entities.EntityFactory.createArrayFrom(result);

                callback(arr);
            });
        }

        loadAllToProperty(callback?) {
            this.getAll(result => {
                for (var rKey in result) {
                    if (result.hasOwnProperty(rKey)) {
                        this[this.propertyName].push(result[rKey]);
                    }
                }

                if (Utils.TypeChecker.isFunction(callback)) {
                    callback();
                }
                this.changeOccured(result);
            });
        }

        clear() {
            this[this.propertyName].splice(0, this[this.propertyName].length);
        }

        registerObserver(observer: ICrudObserver) {
            Utils.ArrayHelpers.pushIfNotInArray(this.observers, observer);
        }

        unregisterObserver(observer: ICrudObserver) {
            Utils.ArrayHelpers.deleteFromArray(this.observers, observer);
        }

        registerChangeListenerCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.pushIfNotInArray(this.callbacks, callback);
        }

        unregisterChangeListenerCallback(callback: IEventCallback) {
            Utils.ArrayHelpers.deleteFromArray(this.callbacks, callback);
        }

        //Sets the concrete hub (and the CRUD client functions) from name, for it's descendant types
        protected initHub(hubName: string): any {
            this.hub = $.connection[hubName];

            this.hub.client.created = (element) => this.created(element);
            this.hub.client.modified = (element) => this.modified(element);
            this.hub.client.deleted = (element) => this.deleted(element);
            this.hub.client.errorFromHub = (error) => this.errorFromHub(error);
            this.hub.client.infoFromHub = (error) => this.infoFromHub(error);
        }

        protected initProperty(): void {
            this.propertyAssert(this.propertyName);
        }

        //called from server or from this.create
        protected created(element: IEntity): void {
            var elm = Entities.EntityFactory.createComplexFrom(element);

            this.touchedElement = elm;
            this[this.propertyName].push(elm);
            this.creationOccured(elm);
        }

        //called from server or from this.modify
        protected modified(element: IEntity): void {
            if (Utils.TypeChecker.isUndefined(element)) {
                throw "problem in the modified method (undefined element)";
            }

            var list = this[this.propertyName];
            for (var i = 0; i < list.length; i++) {
                if (this.isEqualById(list[i], element)) {
                    (<IEntity>list[i]).setUpFromObject(element);

                    break;
                }
            }

            this.modificationOccured(element);
        }

        //called from server or from this.create
        protected deleted(element: IEntity): void {
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
        }

        protected isEqualById(elm1: IEntity, elm2: IEntity) {
            return elm1.Id === elm2.Id;
        }

        protected errorFromHub(error) {
            alert(error.message + "\n To avoid inconsistency we need to reload the page");
            location.reload();
        }

        protected infoFromHub(info) {
            console.log(info);
        }

        //It startes all the hubs for all services
        static startConnections(callback?: any) {
            $.connection.hub.start(() => {
                if (callback instanceof Function) {
                    callback();
                }
            });
        }

        protected propertyAssert(propName: string): void {
            if (!this.hasOwnProperty(propName)) {
                throw "Invalid Property name";
            }

            //Future: uncomment, when TS will support that type of dynamic interface check
            //if (!(this[propName] instanceof Array<IEntity>) {
            //    throw "Invalid Property type, it must be instance of Array<IEntity>";
            //}
        }

        protected creationOccured(element) {
            this.observers.forEach(item => {
                item.created(element);
            });

            this.changeOccured(element);
        }

        protected modificationOccured(element) {
            this.observers.forEach(item => {
                item.modified(element);
            });

            this.changeOccured(element);
        }

        protected deletionOccured(element) {
            this.observers.forEach(item => {
                item.deleted(element);
            });

            this.changeOccured(element);
        }

        protected changeOccured(element) {
            this.callbacks.forEach(item => {
                item(this, element);
            });
        }

    }

    //It uses the promise library of JQuery (it is the minimal dependency of the core library)
    declare var $: any;
    export class BaseSignalRPromisedService extends BaseSignalRService {
        constructor(propertyName) {
            super(propertyName);
        }

        createAsyncPromised(element) {
            var deferred = $.Deferred();

            this.create(element, result => {
                if (result) {
                    deferred.resolve(result);
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise();
        }

        getAllAsyncPromised() {
            var deferred = $.Deferred();

            try {
                this.getAll(arr => {
                    deferred.resolve(arr);
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise();
        }

        loadAllToPropertyAsyncPromised() {
            var deferred = $.Deferred();

            try {
                this.loadAllToProperty(arr => {
                    deferred.resolve(arr);
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise();
        }
    }

    export class BaseOpenCloseService extends BaseSignalRPromisedService {
        active = null;

        constructor(propertyName) {
            super(propertyName);
        }

        open(entity) {
            this.hub.server.open(entity);
            this.active = entity;
        }

        close(entity) {
            this.hub.server.close(entity);
            this.active = null;
        }
    }

    export class BaseGetAllForService extends BaseSignalRPromisedService {
        constructor(propertyName) {
            super(propertyName);
        }

        getAllForEntity(entity, callback: IArrayWaitCallback) {
            this.hub.server.getAllFor(entity).done(result => {
                if (!(Utils.TypeChecker.isArray(result))) {
                    throw { message: "BaseSignalRService.getAll the result from the server was not an Array", result: result };
                }

                var arr = Entities.EntityFactory.createArrayFrom(result);
                callback(arr);
                this.changeOccured(result);
            });
        }

        loadAllForEntityToProperty(entity, callback?) {
            this.getAllForEntity(entity, result => {
                Utils.ArrayHelpers.clearArray(this[this.propertyName]);
                for (var rKey in result) {
                    if (result.hasOwnProperty(rKey)) {
                        this[this.propertyName].push(result[rKey]);
                    }
                }

                if (Utils.TypeChecker.isFunction(callback)) {
                    callback(result);
                }
                this.changeOccured(result);
            });
        }

        getAllForEntityAsyncPromised(entity) {
            var deferred = $.Deferred();

            try {
                this.getAllForEntity(entity, arr => {
                    deferred.resolve(arr);
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise();
        }

        loadAllForEntityToPropertyAsyncPromised(entity) {
            var deferred = $.Deferred();

            try {
                this.loadAllForEntityToProperty(entity, arr => {
                    deferred.resolve(arr);
                });
            } catch (e) {
                deferred.reject(e);
            }

            return deferred.promise();
        }
    }

    export class BaseOpenCloseGetAllForService extends BaseGetAllForService {
        active = null;

        constructor(propertyName) {
            super(propertyName);
        }

        open(entity) {
            this.hub.server.open(entity);
            this.active = entity;
        }

        close(entity) {
            this.hub.server.close(entity);
            this.active = null;
        }
    }
}