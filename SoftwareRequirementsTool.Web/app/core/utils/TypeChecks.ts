module Utils {
    export class TypeChecker {
        static isFunction(fnc): boolean {
            if (this.isUndefined(fnc)) {
                return false;
            }

            if (!(fnc instanceof Function)) {
                return false;
            }

            return true;
        }

        static isUndefined(variable): boolean {
            return (typeof variable === "undefined");
        }

        static isUndefinedOrNull(variable): boolean {
            var undef = this.isUndefined(variable);

            return (undef || (variable === null));
        }

        static isArray(variable) {
            if (this.isUndefined(variable)) {
                return false;
            }

            return (Object.prototype.toString.call(variable) === "[object Array]");
        }
    }
}