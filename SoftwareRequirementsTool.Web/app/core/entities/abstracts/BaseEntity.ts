module Entities {
    export class BaseEntity implements IEntity {
        Id: number;
        TypeName: string;

        private service: IServerService;

        setService(service: IServerService) {
            this.service = service;
        }

        setUpFromObject(object) {
            Utils.InitFromObj.initObj(this, object);
        }

        static createFromObject(object) {
            var baseEntity = new BaseEntity();
            baseEntity.setUpFromObject(object);

            return baseEntity;
        }

        isValid(): boolean {
            return true;
        }

        save(): void {
            if (this.service) {
                this.service.modify(this);
            }
        }

        rollback(): void {
            //this.service.resetFromServer(this);
        }
    }
    
    export class BaseElement extends BaseEntity implements IElement {

        Author: string;
        Description: string;
        Name: string;
        Id: number;
        TypeName: string;
        ContainerProject: Project;

        setService(service: IServerService) { }

        setUpFromObject(object) {}

        save(): void {}

        rollback(): void {}

        isValid() {
            if (Utils.TypeChecker.isUndefinedOrNull(this.Name)) {
                return false;
            }

            if (this.Name === "") {
                return false;
            }

            if (Utils.TypeChecker.isUndefinedOrNull(this.ContainerProject)) {
                return false;
            }
            
            return super.isValid();
        }
    }
}