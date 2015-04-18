module Utils {
    export class InitFromObj {

        static isObject(obj) {
            return (obj instanceof Object);
        }

        static initObj(toInitObj, fromObj): void {
            
            if (!InitFromObj.isObject(fromObj)) {
                console.log(fromObj);
                throw "fromObj parameter is not an object";
            }

            if (!InitFromObj.isObject(toInitObj)) {
                console.log(toInitObj);
                throw "toInitObj parameter is not an object";
            }
            
            for (var attrKey in fromObj) {
                if (fromObj.hasOwnProperty(attrKey)) {
                    toInitObj[attrKey] = fromObj[attrKey];
                }
            }

        }
    }
}