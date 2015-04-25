﻿module CoreServices {

    export class BaseSignalRService implements ICrudObservableSubject, IServerService {

        protected hub: any;
        protected propertyName;

        static activeChildServices = new Array<IServerService>();

        protected observers = new Array<ICrudObserver>();
        protected callbacks = new Array<IEventCallback>();


        lastActiveElement: any;

        constructor(propertyName) {
            this.propertyName = propertyName;
        }

        create(element, callback?) {
            this.hub.server.create(element).done((result) => {
                this.created(result);

                if (Utils.TypeChecker.isFunction(callback)) {
                    callback(this.lastActiveElement);
                }
            });
        }

        modify(element, callback?) {
            this.hub.server.modify(element);
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
                    throw { message: "BaseSignalRService.getAll the result from the server vas not an Array", result: result}
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

        //Sets the concrete hub (and the CRUD client functions) from name, for it's descendant types
        protected initHub(hubName: string): any {
            this.hub = $.connection[hubName];

            this.hub.client.created = (element) => this.created(element);
            this.hub.client.modified = (element) => this.modified(element);
            this.hub.client.deleted = (element) => this.deleted(element);
        }

        protected initProperty(): void {
            this.propertyAssert(this.propertyName);
        }
        
        init() { }

        //called from server or from this.create
        protected created(element: IEntity): void {
            var elm = Entities.EntityFactory.createComplexFrom(element);
            
            this[this.propertyName].push(elm);
            this.creationOccured(elm);
        }

        //called from server or from this.modify
        protected modified(element: IEntity): void {

            if (Utils.TypeChecker.isUndefined(element)) {
                throw "problem in the modified method";
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

        //It startes all the hubs for all services
        static startConnections(callback?: any) {
            $.connection.hub.start(() => {
                this.initActiveChildServices(callback);
            });
        }

        static initActiveChildServices(callback?: any) {

            this.activeChildServices.forEach(item => {
                item.init();
            });

            if (callback instanceof Function) {
                callback();
            }
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
    }

    export class BaseOpenCloseService extends BaseSignalRService {
        constructor(propertyName) {
            super(propertyName);
        }

        open(entity) {
            this.hub.server.open(entity);
        }

        close(entity) {
            this.hub.server.close(entity);
        }
    }

    export class BaseGetAllForService extends BaseSignalRService {
        constructor(propertyName) {
            super(propertyName);
        }

        getAllForEntity(entity, callback: IArrayWaitCallback) {
            this.hub.server.getAllFor(entity).done(result => {

                if (!Utils.TypeChecker.isArray(result)) {
                    throw { message: "BaseSignalRService.getAll the result from the server vas not an Array", result: result }
                }

                var arr = Entities.EntityFactory.createArrayFrom(result);
                callback(arr);
            });
        }

        loadAllForEntityToProperty(entity,callback?) {
            this.getAllForEntity(entity, result => {
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
    }

    export class BaseOpenCloseGetAllForService extends BaseGetAllForService {
        constructor(propertyName) {
            super(propertyName);
        }

        open(entity) {
            this.hub.server.open(entity);
        }

        close(entity) {
            this.hub.server.close(entity);
        }
    }
}