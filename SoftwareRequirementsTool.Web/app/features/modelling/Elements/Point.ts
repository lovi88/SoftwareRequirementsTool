/// <reference path="baseinitfromobj.ts" />

module Modelling {
    export class Point extends BaseInitFromObj implements IPoint {

        x: number;
        y: number;

        constructor(point?: IPoint) {
            super();
            super.initFromObj(point);
        }
    }
} 