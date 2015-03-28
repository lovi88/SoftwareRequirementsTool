/// <reference path="abselement.ts" />

module Modelling {

    export class UseCaseView extends BaseElementView {
        
        cx: number = 151;    //center of the ellipse
        cy: number = 51;
        rx: number = 150;    //radius
        ry: number = 50;

        constructor(usecase?: IElementView) {
            super(usecase);
        }
    }


}