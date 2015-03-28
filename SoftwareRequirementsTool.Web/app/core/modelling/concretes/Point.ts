module Modelling {
    export class Point extends AbsInitFromObj implements IPoint {

        x: number;
        y: number;

        constructor(point?: IPoint) {
            super();
            super.initFromObj(point);
        }
    }
} 