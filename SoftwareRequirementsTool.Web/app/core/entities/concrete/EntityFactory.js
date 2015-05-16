var Entities;
(function (Entities) {
    var EntityFactory = (function () {
        function EntityFactory() {
        }
        /**
         * It can generate concrete IEntity types
         * from the IEntity.Type property
         * the TS classes must be in the Entities module
         * the TS class name must be the same as CS class have
         * Or we will use the common BaseEntity or BaseView
         */
        EntityFactory.createFrom = function (object) {
            var nameSpaceString = "Entities.";
            var crClass = Utils.DynamycTypeHelper.stringToFunction(nameSpaceString + object.TypeName);
            var crObj;
            if (crClass == null) {
                if (object.TypeName.indexOf("View") > -1) {
                    crObj = new Entities.BaseView();
                }
                else if (!(Utils.TypeChecker.isUndefined(object.ContainerProject))) {
                    crObj = new Entities.BaseElement();
                }
                else {
                    crObj = new Entities.BaseEntity();
                }
            }
            else {
                crObj = new crClass();
            }
            this.setUpComplex(crObj, object);
            return crObj;
        };
        EntityFactory.createComplexFrom = function (object) {
            var ret;
            if (Utils.TypeChecker.isArray(object)) {
                //object is an Array
                ret = this.createArrayFrom(object);
            }
            else if (!(Utils.TypeChecker.isUndefined(object.TypeName))) {
                //object is IEntity
                ret = this.createFrom(object);
                this.setUpComplex(ret, object);
            }
            else {
                //object is a simple type or it is an Object of unconcerned type
                ret = object;
            }
            return ret;
        };
        EntityFactory.createArrayFrom = function (objectArray) {
            var ret = new Array();
            for (var i = 0; i < objectArray.length; i++) {
                ret[i] = this.createComplexFrom(objectArray[i]);
            }
            return ret;
        };
        EntityFactory.createViewFrom = function (object) {
            if (!(object.TypeName.indexOf("View") > -1)) {
                throw { message: "EntityFactory.createViewFrom(object) object.TypeName is not a View name", parameter: object };
            }
            return this.createFrom(object);
        };
        EntityFactory.setUpComplex = function (objectToSetUp, fromObject) {
            for (var attrKey in fromObject) {
                if (fromObject.hasOwnProperty(attrKey)) {
                    if (fromObject[attrKey] instanceof Object) {
                        objectToSetUp[attrKey] = this.createComplexFrom(fromObject[attrKey]);
                    }
                    else {
                        objectToSetUp[attrKey] = fromObject[attrKey];
                    }
                }
            }
        };
        return EntityFactory;
    })();
    Entities.EntityFactory = EntityFactory;
})(Entities || (Entities = {}));
//# sourceMappingURL=EntityFactory.js.map