module Entities {
    export class Point extends BaseEntity implements IPoint {
        X: number;
        Y: number;

        constructor() {
            this.X = 0;
            this.Y = 0;
            super();
        }
    }
} 