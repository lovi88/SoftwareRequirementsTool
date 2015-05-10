var Utils;
(function (Utils) {
    var ArrayHelpers = (function () {
        function ArrayHelpers() {
        }
        ArrayHelpers.isArray = function (array) {
            return (array instanceof Array);
        };
        ArrayHelpers.inArray = function (array, elementToSearch) {
            var idx = array.indexOf(elementToSearch);
            return (idx > -1);
        };
        ArrayHelpers.deleteFromArray = function (fromArray, elementToDelete, throwEx) {
            if (!this.isArray(fromArray)) {
                if (throwEx) {
                    throw { message: "parameter fromArray must be an array", givenParameterValue: elementToDelete };
                }
                return;
            }
            var idx = fromArray.indexOf(elementToDelete);
            if (idx > -1) {
                fromArray.splice(idx, 1);
            }
            else {
                if (throwEx) {
                    throw { message: "parameter elementToDelete was not find in the array", givenParameterValue: elementToDelete };
                }
            }
        };
        ArrayHelpers.pushIfNotInArray = function (array, elementToPush) {
            if (!this.isArray(array)) {
                return;
            }
            if (this.inArray(array, elementToPush)) {
                return;
            }
            array.push(elementToPush);
        };
        ArrayHelpers.clearArray = function (array) {
            array.splice(0, array.length);
        };
        ArrayHelpers.overWriteArray = function (arrayToOverwrite, withArray) {
            this.clearArray(arrayToOverwrite);
            for (var rKey in withArray) {
                if (withArray.hasOwnProperty(rKey)) {
                    arrayToOverwrite[rKey] = withArray[rKey];
                }
            }
        };
        return ArrayHelpers;
    })();
    Utils.ArrayHelpers = ArrayHelpers;
})(Utils || (Utils = {}));
//# sourceMappingURL=ArrayHelpers.js.map