module Modelling {
    export class Point extends Base implements IPoint {

        x: number;
        y: number;

        constructor(point?: IPoint) {
            super(point);
        }
    }
} 