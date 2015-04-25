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

        save(): void {
            if (this.service) {
                this.service.modify(this);
            }
        }

        rollback(): void {
            //this.service.resetFromServer(this);
        }
    }
    
}