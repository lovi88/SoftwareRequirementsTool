module Utils {
    export class InitFromObj {

        static isObject(obj) {
            return (obj instanceof Object);
        }

        static initObj(toInitObj, fromObj): void {

            if (!InitFromObj.isObject(fromObj)) {
                throw "fromObj parameter is not an object";
            }

            if (!InitFromObj.isObject(toInitObj)) {
                throw "toInitObj parameter is not an object";
            }

            for (var attrKey in fromObj) {
                if (fromObj.hasOwnProperty(attrKey)) {
                    toInitObj[attrKey] = fromObj[attrKey];
                }
            }

        }
    }

    export class DynamycTypeHelper {
        
        /* The string parameter must be the full name of the function/constructor to create
         * so if you use namespaces/modules you have to write down the whole type path (like: Utils.DynamycTypeHelper)
         */
        static stringToFunction(str: string): any {

            var arr = str.split(".");

            var fn = (window || this);
            for (var i = 0, len = arr.length; i < len; i++) {
                fn = fn[arr[i]];
            }

            if (typeof fn !== "function") {
                return null;
            }

            return fn;
        }

    }


}