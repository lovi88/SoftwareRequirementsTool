module Entities {
    export class Connection extends BaseEntity implements IConnection {
        Scope: IEntity;
        Stereotype: IStereotype;
        ConnectionType: string;

        private _service;

        constructor(public From: IEntity, public To: IEntity) {
            super();
        }

        setUpFromObject(object: IConnection) {
            this.Id = object.Id;

            this.From = EntityFactory.createFrom(object.From);
            this.To = EntityFactory.createFrom(object.To);
        }
    }
}