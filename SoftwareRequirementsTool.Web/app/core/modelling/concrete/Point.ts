module Modelling {
    export class Point implements IPoint {

        x: number;
        y: number;

        constructor(point?: IPoint) {
            if (point) {
                Utils.InitFromObj.initObj(this, point);
            }
        }
    }
} 