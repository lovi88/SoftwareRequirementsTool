module Utils {
    export class TypeChecker {
        static isFunction(fnc?): boolean {
            if (!fnc) {
                return false;
            }

            if (!(fnc instanceof Function)) {
                return false;
            }

            return true;
        }

        static isUndefined(variable?): boolean {
            return (typeof variable === "undefined");
        }
    }
}