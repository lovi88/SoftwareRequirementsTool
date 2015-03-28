module Modelling {
    export class AbsInitFromObj {

        initFromObj(obj?: any): void {
            if (!obj) {
                return;
            }

            for (var attrKey in obj) {
                if (obj.hasOwnProperty(attrKey)) {
                    this[attrKey] = obj[attrKey];
                }
            }

        }
    }
} 