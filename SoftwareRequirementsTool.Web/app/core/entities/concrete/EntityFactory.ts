module Entities {
    export class EntityFactory {
        /**
         * It can generate concrete IEntity types
         * from the IEntity.Type property
         * the TS classes must be in the Entities module
         * the TS class name must be the same as CS class have
         * Or we will use the common BaseEntity or BaseView
         */
        static createFrom(object): IEntity {
            var nameSpaceString = "Entities.";
            var crClass = Utils.DynamycTypeHelper.stringToFunction(nameSpaceString + object.TypeName);

            var crObj: IEntity;
            if (crClass == null) {
                if (object.TypeName.indexOf("View") > -1) {
                    crObj = new BaseView();
                } else if (!(Utils.TypeChecker.isUndefined(object.ContainerProject))) {
                    crObj = new BaseElement();
                } else {
                    crObj = new BaseEntity();
                }
            } else {
                crObj = new crClass();
            }

            this.setUpComplex(crObj, object);

            return crObj;
        }

        static createComplexFrom(object): any {
            var ret;

            if (Utils.TypeChecker.isArray(object)) {
                //object is an Array
                ret = this.createArrayFrom(object);
            } else if (!(Utils.TypeChecker.isUndefined(object.TypeName))) {
                //object is IEntity
                ret = this.createFrom(object);
                this.setUpComplex(ret, object);
            } else {
                //object is a simple type or it is an Object of unconcerned type
                ret = object;
            }

            return ret;
        }

        static createArrayFrom(objectArray): Array<any> {
            var ret = new Array();

            for (var i = 0; i < objectArray.length; i++) {
                ret[i] = this.createComplexFrom(objectArray[i]);
            }

            return ret;
        }

        static createViewFrom(object: IEntity): IView {
            if (!(object.TypeName.indexOf("View") > -1)) {
                throw { message: "EntityFactory.createViewFrom(object) object.TypeName is not a View name", parameter: object };
            }

            return <IView>this.createFrom(object);
        }

        static setUpComplex(objectToSetUp, fromObject) {
            for (var attrKey in fromObject) {
                if (fromObject.hasOwnProperty(attrKey)) {
                    if (fromObject[attrKey] instanceof Object) {
                        objectToSetUp[attrKey] = this.createComplexFrom(fromObject[attrKey]);
                    } else {
                        objectToSetUp[attrKey] = fromObject[attrKey];
                    }
                }
            }
        }
    }
} 