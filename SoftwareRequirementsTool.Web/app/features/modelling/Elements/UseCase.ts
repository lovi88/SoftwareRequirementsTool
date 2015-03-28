/// <reference path="baseelement.ts" />

module Modelling {

    export class UseCase extends BaseElement {
        constructor(element: IElement) {
            super(element);
        }

        init() {
            this.data = new BaseElementData();
            this.view = new UseCaseView();
        }
    }

    export class UseCaseView extends BaseElementView implements IUseCaseView {
        
        cx: number = 151;    //center of the ellipse
        cy: number = 51;
        rx: number = 150;    //radius
        ry: number = 50;

        constructor(usecase?: IElementView) {
            super(usecase);
        }
    }


}