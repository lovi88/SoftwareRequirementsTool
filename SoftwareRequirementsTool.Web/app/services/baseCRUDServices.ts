module ServiceParts {
    export class BaseCrudService {

        constructor(protected serviceInstance) {
            
        }

        create(element, callback) {
            this.serviceInstance.create(element, callback);
        }

        modify(element) {
            this.serviceInstance.modify(element);
        }

        deleteEntity(element) {
            this.serviceInstance.deleteEntity(element);
        }

    }

    export class BaseCrudOpenCloseService extends BaseCrudService {

        openedElement = null;

        constructor(
            serviceInstance,
            protected storage,
            protected storageKey: string,
            private openCallBack,
            private closeCallBack) {

            super(serviceInstance);

            var elmInStorage = this.storage[this.storageKey];
            if (!(Utils.TypeChecker.isUndefined(elmInStorage))) {
                this.open(elmInStorage);
            }
        }

        close(element) {
            this.serviceInstance.close(element);

            this.openedElement = null;
            
            delete localStorage[this.storageKey];

            if (Utils.TypeChecker.isFunction(this.closeCallBack)) {
                this.closeCallBack(element);
            }
        }

        open(element) {
            if (this.openedElement !== null) {
                this.close(this.openedElement);
            }

            this.serviceInstance.open(element);
            
            this.openedElement = element;
            this.storage[this.storageKey] = element;

            if (Utils.TypeChecker.isFunction(this.openCallBack)) {
                this.openCallBack(element);
            }
        }

        deleteEntity(element) {
            if (this.isActive(element)) {
                this.close(element);
            }

            super.deleteEntity(element);
        }

        isActive(element) {

            if (Utils.TypeChecker.isUndefinedOrNull(element)) {
                return false;
            }

            if (Utils.TypeChecker.isUndefinedOrNull(this.openedElement)) {
                return false;
            }

            return (element.Id === this.openedElement.Id);
        }

        getActive():any {
            return this.openedElement;
        }
    }

}