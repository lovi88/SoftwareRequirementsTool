var Utils;
(function (Utils) {
    var InitFromObj = (function () {
        function InitFromObj() {
        }
        InitFromObj.isObject = function (obj) {
            return (obj instanceof Object);
        };
        InitFromObj.initObj = function (toInitObj, fromObj) {
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
        };
        return InitFromObj;
    })();
    Utils.InitFromObj = InitFromObj;
    var DynamycTypeHelper = (function () {
        function DynamycTypeHelper() {
        }
        /* The string parameter must be the full name of the function/constructor to create
         * so if you use namespaces/modules you have to write down the whole type path (like: Utils.DynamycTypeHelper)
         */
        DynamycTypeHelper.stringToFunction = function (str) {
            var arr = str.split(".");
            var fn = (window || this);
            for (var i = 0, len = arr.length; i < len; i++) {
                fn = fn[arr[i]];
            }
            if (typeof fn !== "function") {
                return null;
            }
            return fn;
        };
        return DynamycTypeHelper;
    })();
    Utils.DynamycTypeHelper = DynamycTypeHelper;
})(Utils || (Utils = {}));
//# sourceMappingURL=objectHelpers.js.map