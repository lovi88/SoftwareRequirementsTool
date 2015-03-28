module Modelling {
    export class Base {
        constructor(object?: any) {
            if (object) {
                this.initFromObj(object);
            }
        }

        private initFromObj(obj: any): void {
            for (var attrKey in obj) {
                if (obj.hasOwnProperty(attrKey)) {
                    this[attrKey] = obj[attrKey];
                }
            }

        }
    }
} 