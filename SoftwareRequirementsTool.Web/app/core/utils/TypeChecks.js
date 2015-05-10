var Utils;
(function (Utils) {
    var TypeChecker = (function () {
        function TypeChecker() {
        }
        TypeChecker.isFunction = function (fnc) {
            if (this.isUndefined(fnc)) {
                return false;
            }
            if (!(fnc instanceof Function)) {
                return false;
            }
            return true;
        };
        TypeChecker.isUndefined = function (variable) {
            return (typeof variable === "undefined");
        };
        TypeChecker.isUndefinedOrNull = function (variable) {
            var undef = this.isUndefined(variable);
            return (undef || (variable === null));
        };
        TypeChecker.isArray = function (variable) {
            if (this.isUndefined(variable)) {
                return false;
            }
            return (Object.prototype.toString.call(variable) === "[object Array]");
        };
        return TypeChecker;
    })();
    Utils.TypeChecker = TypeChecker;
})(Utils || (Utils = {}));
//# sourceMappingURL=TypeChecks.js.map