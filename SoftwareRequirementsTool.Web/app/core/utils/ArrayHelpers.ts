module Utils {
    export class ArrayHelpers {

        static isArray(array): boolean {
            return (array instanceof Array);
        }

        static inArray(array, elementToSearch): boolean {
            var idx = array.indexOf(elementToSearch);

            return (idx > -1);
        }

        static deleteFromArray(fromArray, elementToDelete, throwEx?: boolean) {
            if (!this.isArray(fromArray)) {
                if (throwEx) {
                    throw { message: "parameter fromArray must be an array", givenParameterValue: elementToDelete };
                }

                return;
            }

            var idx = fromArray.indexOf(elementToDelete);
            if (idx > -1) {
                fromArray.splice(idx, 1);
            } else {
                if (throwEx) {
                    throw { message: "parameter elementToDelete was not find in the array", givenParameterValue: elementToDelete };
                }
            }

        }

        static pushIfNotInArray(array, elementToPush) {

            if (!this.isArray(array)) {
                return;
            }

            if (this.inArray(array, elementToPush)) {
                return;
            }

            array.push(elementToPush);
        }

        static clearArray(array: Array<any>): void {
            array.splice(0, array.length);
        }

        static overWriteArray(arrayToOverwrite,withArray) {
            this.clearArray(arrayToOverwrite);

            for (var rKey in withArray) {
                if (withArray.hasOwnProperty(rKey)) {
                    arrayToOverwrite[rKey] = withArray[rKey];
                }
            }
        }
    }
} 